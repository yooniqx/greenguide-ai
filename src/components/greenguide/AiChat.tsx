import { useRef, useState } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What eco-friendly actions can I take from this image?",
  "How can I save water here?",
  "How should I dispose of this item?",
  "How can I reduce my electricity bill?",
  "Eco-friendly alternatives for plastic?",
  "How can I reduce my carbon footprint?",
  "Greener daily habits",
];

function generateReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("electric") || lower.includes("bill") || lower.includes("energy"))
    return "Great question! Here are 5 impactful moves:\n\n1. **Switch to LED bulbs** — up to 75% less energy than incandescent.\n2. **Unplug idle electronics** — phantom load can be ~10% of your bill.\n3. **Set AC to 24°C** — every 1°C cooler adds ~6% consumption.\n4. **Wash clothes in cold water** — heating water is ~90% of the cycle's energy.\n5. **Air-dry when possible** — dryers are one of the top three energy hogs.\n\nEstimated saving: **₹600–₹1,200 / month** for an average household.";
  if (lower.includes("waste") || lower.includes("dispose") || lower.includes("garbage"))
    return "Sort waste into 4 streams for maximum recovery:\n\n• **Wet (compostable):** food scraps, peels → home compost or municipal bin.\n• **Dry recyclable:** paper, glass, clean plastic → rinse & bag separately.\n• **Hazardous:** batteries, paint, meds → community drop-off only.\n• **E-waste:** electronics → authorized e-waste collector.\n\nTip: 60% of household waste is compostable. Starting a small bin cuts landfill contribution dramatically.";
  if (lower.includes("water"))
    return "Simple habits that stack up quickly:\n\n• Fix leaky taps — 1 drip/sec ≈ **11,000 L/year** wasted.\n• Install low-flow aerators (~₹200) — saves ~40% at the tap.\n• Shorter showers: cutting 2 min saves **~30 L per shower**.\n• Reuse RO reject water for plants or mopping.\n• Run the dishwasher/washer only on full loads.\n\nWeekly target: **210 L saved** — very achievable!";
  if (lower.includes("plastic") || lower.includes("alternative"))
    return "Swap out the top offenders first:\n\n• Plastic bottles → **stainless steel** (lasts ~10 years).\n• Cling wrap → **beeswax wraps** (reusable ~1 year).\n• Toothbrush → **bamboo** (biodegradable).\n• Cotton buds → **bamboo swabs**.\n• Grocery bags → **jute / cloth totes**.\n• Straws → **steel or silicone**.\n\nEven swapping 3 of these can prevent **~200 plastic items/year** per person.";
  if (lower.includes("carbon") || lower.includes("footprint"))
    return "Your biggest levers, by impact:\n\n1. **Diet:** one plant-based meal/day ≈ **300 kg CO₂/year** saved.\n2. **Transport:** cycling/walking short trips ≈ **150 kg CO₂/year**.\n3. **Energy:** switching to a green tariff can cut home footprint by 40%.\n4. **Shopping:** buy less, buy second-hand — production is ~60% of an item's footprint.\n\nTypical Indian household footprint: 4.2 t CO₂/yr. Target: below 3 t.";
  if (lower.includes("travel"))
    return "Sustainable travel starter kit:\n\n• Prefer **trains over flights** for <1000 km (up to 90% less CO₂).\n• **Direct flights** — takeoff/landing is the emissions-heavy phase.\n• Pack a **reusable bottle, cutlery, tote**.\n• Choose **locally owned** stays — money stays in the community.\n• Offset unavoidable emissions via verified Gold Standard projects.";
  if (lower.includes("habit") || lower.includes("daily"))
    return "Small daily wins — pick 3 to start:\n\n☘️ Carry a reusable bottle + cloth bag.\n☘️ Meatless Monday.\n☘️ Unplug chargers at night.\n☘️ 5-minute shower rule.\n☘️ Segregate wet & dry waste.\n☘️ Cycle/walk for trips < 2 km.\n☘️ Digital receipts only.\n\nBuild the habit for 21 days — then add the next.";
  if (lower.includes("image") || lower.includes("action") || lower.includes("this"))
    return "Great — here's how to think about the item or scene you're describing:\n\n• **Identify the material** — is it single-use plastic, metal, glass, organic, or e-waste? Material dictates disposal.\n• **Assess reuse potential** — can it be repaired, refilled, or repurposed before disposal?\n• **Route it correctly** — wet waste composts, dry recyclables go to recycling, e-waste and batteries go to authorized collectors.\n• **Find a greener alternative** — for repeat purchases, look for durable, refillable, or plant-based versions.\n\nShare more detail (what it is, how you use it) and I'll tailor the guidance further.";

}

export function AiChat() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "🌱 Hi! I'm your GreenGuide AI assistant. Ask me anything about sustainability — from cutting your power bill to disposing of e-waste. Try a prompt below to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { role: "user", content: q }]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 700));
    setMessages((m) => [...m, { role: "assistant", content: generateReply(q) }]);
    setLoading(false);
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <div className="glass-strong overflow-hidden rounded-3xl">
      <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-leaf to-sage text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="font-semibold text-foreground">AI Sustainability Assistant</div>
          <div className="text-xs text-muted-foreground">
            Powered by GreenGuide AI · always learning
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full bg-leaf/10 px-2.5 py-1 text-[11px] font-medium text-leaf">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
          Online
        </div>
      </div>

      <div className="flex max-h-[440px] min-h-[340px] flex-col gap-3 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`animate-fade-up flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-gradient-to-br from-leaf to-[color-mix(in_oklch,var(--leaf)_80%,black_10%)] text-white shadow-[var(--shadow-soft)]"
                  : "bg-white/70 text-foreground shadow-sm ring-1 ring-border/60"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-sm text-muted-foreground ring-1 ring-border/60">
              <Loader2 className="h-4 w-4 animate-spin text-leaf" />
              GreenGuide is thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border/60 bg-white/40 px-4 py-4 sm:px-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-border/70 bg-white/60 px-3 py-1.5 text-xs text-foreground/80 transition hover:-translate-y-0.5 hover:border-leaf/40 hover:bg-leaf/5 hover:text-leaf"
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
            placeholder="Ask your sustainability question..."
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
