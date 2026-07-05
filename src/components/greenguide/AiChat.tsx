import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Loader2, ImageIcon, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { useEcoImage } from "@/lib/eco-image-context";

type Msg = {
  role: "user" | "assistant";
  content: string;
  imageThumb?: string;
};

const BASE_SUGGESTIONS = [
  "How can I reduce my electricity bill?",
  "Eco-friendly alternatives to plastic?",
  "How can I reduce my carbon footprint?",
  "Greener daily habits",
];

const IMAGE_SUGGESTIONS = [
  "What eco-friendly actions can I take from this image?",
  "How can I save water here?",
  "How should I dispose of this item?",
  "What greener alternative would you suggest?",
];

function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-foreground prose-p:my-2 prose-p:leading-relaxed prose-strong:text-foreground prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-a:text-leaf prose-code:rounded prose-code:bg-black/5 prose-code:px-1 prose-code:py-0.5 prose-code:text-[0.85em] prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:bg-black/85 prose-pre:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

export function AiChat() {
  const { image, setImage } = useEcoImage();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "🌱 **Hi! I'm GreenGuide AI.**\n\nAsk me any sustainability question, or upload an image and I'll base my answer on what's in the picture.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    // Skip initial mount so the page doesn't auto-scroll to the Assistant
    // section on first load. Only scroll the messages list on subsequent updates.
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const el = endRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (parent) {
      parent.scrollTop = parent.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;

    const attachedImage = image?.dataUrl ?? null;
    const userMsg: Msg = {
      role: "user",
      content: q,
      imageThumb: attachedImage ?? undefined,
    };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          imageDataUrl: attachedImage,
        }),
      });

      if (!res.ok) {
        let errMsg = "Something went wrong. Please try again.";
        try {
          const data = (await res.json()) as { message?: string; error?: string };
          if (data?.message) errMsg = data.message;
          if (data?.error === "ai_unavailable" && attachedImage) {
            errMsg =
              "Image reasoning is currently unavailable because the Gemini Vision API is not configured. I can still help with text questions.";
          }
        } catch {
          /* ignore */
        }
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${errMsg}` }]);
        return;
      }

      const data = (await res.json()) as { reply?: string };
      const reply = data.reply?.trim() || "I couldn't generate a response. Please try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "⚠️ Network error — please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = image ? IMAGE_SUGGESTIONS : BASE_SUGGESTIONS;

  return (
    <div className="glass-strong flex flex-col overflow-hidden rounded-3xl">
      <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-leaf to-sage text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="font-semibold text-foreground">AI Sustainability Assistant</div>
          <div className="text-xs text-muted-foreground">
            Powered by Gemini · multimodal reasoning
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-leaf/10 px-2.5 py-1 text-[11px] font-medium text-leaf">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
          Online
        </div>
      </div>

      <div className="flex max-h-[460px] min-h-[360px] flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`animate-fade-up flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gradient-to-br from-leaf to-[color-mix(in_oklch,var(--leaf)_80%,black_10%)] text-white shadow-[var(--shadow-soft)]"
                  : "bg-white/80 text-foreground shadow-sm ring-1 ring-border/60"
              }`}
            >
              {m.imageThumb && (
                <img
                  src={m.imageThumb}
                  alt="attached"
                  className="mb-2 max-h-40 w-full rounded-lg object-cover"
                />
              )}
              {m.role === "assistant" ? (
                <Markdown>{m.content}</Markdown>
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 text-sm text-muted-foreground ring-1 ring-border/60">
              <Loader2 className="h-4 w-4 animate-spin text-leaf" />
              GreenGuide is thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border/60 bg-white/40 px-4 py-4 sm:px-6">
        {image && (
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-leaf/25 bg-leaf/5 p-2 pr-3">
            <img
              src={image.dataUrl}
              alt={image.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-leaf">
                <ImageIcon className="h-3 w-3" /> Attached to next message
              </div>
              <div className="truncate text-xs text-muted-foreground">{image.name}</div>
            </div>
            <button
              type="button"
              onClick={() => setImage(null)}
              className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition hover:bg-white hover:text-foreground"
              aria-label="Remove attached image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={loading}
              className="rounded-full border border-border/70 bg-white/60 px-3 py-1.5 text-xs text-foreground/80 transition hover:-translate-y-0.5 hover:border-leaf/40 hover:bg-leaf/5 hover:text-leaf disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white/80 px-3 py-2 focus-within:border-leaf/50 focus-within:ring-2 focus-within:ring-leaf/15"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              image ? "Ask about the uploaded image..." : "Ask your sustainability question..."
            }
            className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            size="icon"
            disabled={loading || !input.trim()}
            className="h-9 w-9 rounded-xl bg-gradient-to-br from-leaf to-sage text-white hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
