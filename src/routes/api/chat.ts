import { createFileRoute } from "@tanstack/react-router";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages?: ChatMessage[];
  imageDataUrl?: string | null;
};

const ALLOWED_ROLES = new Set(["user", "assistant"]);
const MAX_MESSAGES = 50;
const MAX_CONTENT_LEN = 4000;
// ~8 MB raw; base64 is ~4/3 larger. Cap the data URL string at ~11 MB.
const MAX_IMAGE_DATA_URL_LEN = 11 * 1024 * 1024;


const SYSTEM_PROMPT = `You are GreenGuide AI, an environmental sustainability assistant.

When the user has uploaded an image:
- Always analyze the uploaded image first.
- Base your answer primarily on what is visible in the image.
- Only provide general advice if something cannot be inferred from the image.
- Never hallucinate objects that are not visible.

Format every response in clean Markdown:
- Use short bold section headings (e.g. **Observation**, **Recommendations**).
- Use concise paragraphs and bullet lists.
- Prefer numbered lists for step-by-step actions.
- Keep the tone practical, warm, and specific.
- Avoid preambles like "Sure!" or "Certainly!".`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatRequestBody;
        try {
          body = (await request.json()) as ChatRequestBody;
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const { messages, imageDataUrl } = body;
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("messages required", { status: 400 });
        }
        if (messages.length > MAX_MESSAGES) {
          return new Response("Too many messages", { status: 400 });
        }
        for (const m of messages) {
          if (!m || typeof m.role !== "string" || !ALLOWED_ROLES.has(m.role)) {
            return new Response("Invalid message role", { status: 400 });
          }
          if (typeof m.content !== "string") {
            return new Response("Invalid message content", { status: 400 });
          }
          if (m.content.length > MAX_CONTENT_LEN) {
            return new Response("Message content too long", { status: 400 });
          }
        }
        if (imageDataUrl != null) {
          if (typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image/")) {
            return new Response("Invalid image data", { status: 400 });
          }
          if (imageDataUrl.length > MAX_IMAGE_DATA_URL_LEN) {
            return new Response("Image too large", { status: 413 });
          }
        }


        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return Response.json(
            {
              error: "ai_unavailable",
              message:
                "AI is not configured on the server. Image reasoning requires a configured Gemini Vision API.",
            },
            { status: 503 },
          );
        }

        // Build gateway messages. Attach the image to the LAST user message.
        const gatewayMessages: Array<Record<string, unknown>> = [
          { role: "system", content: SYSTEM_PROMPT },
        ];
        for (let i = 0; i < messages.length; i++) {
          const m = messages[i];
          const isLast = i === messages.length - 1;
          if (isLast && m.role === "user" && imageDataUrl) {
            gatewayMessages.push({
              role: "user",
              content: [
                { type: "text", text: m.content },
                { type: "image_url", image_url: { url: imageDataUrl } },
              ],
            });
          } else {
            gatewayMessages.push({ role: m.role, content: m.content });
          }
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: gatewayMessages,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          if (res.status === 429) {
            return Response.json(
              { error: "rate_limited", message: "Too many requests — please retry in a moment." },
              { status: 429 },
            );
          }
          if (res.status === 402) {
            return Response.json(
              {
                error: "credits_exhausted",
                message: "AI credits are exhausted. Please add credits to continue.",
              },
              { status: 402 },
            );
          }
          console.error("Gateway error", res.status, text);
          return Response.json(
            { error: "ai_error", message: "The AI service returned an error." },
            { status: 502 },
          );
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content ?? "";
        return Response.json({ reply });
      },
    },
  },
});
