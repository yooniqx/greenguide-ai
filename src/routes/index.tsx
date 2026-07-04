import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Recycle,
  Wind,
  Zap,
  Droplets,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  Github,
  Menu,
  X,
  ShoppingBag,
  MapPin,
  FileText,
  Info,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "sonner";
import { Logo } from "@/components/greenguide/Logo";
import { Lotus, Leaf as LeafIllu } from "@/components/greenguide/decor";
import { AiChat } from "@/components/greenguide/AiChat";
import { ImageAnalysis } from "@/components/greenguide/ImageAnalysis";
import { EcoImageProvider } from "@/lib/eco-image-context";

export const Route = createFileRoute("/")({ component: Home });

const NAV = [
  ["Home", "hero"],
  ["Features", "features"],
  ["How it Works", "how"],
  ["Assistant", "assistant"],
  ["Insights", "insights"],
  ["About", "about"],
  ["Contact", "contact"],
];

const FEATURES = [
  { i: MessageSquare, t: "AI Sustainability Chat", d: "Ask any eco question — get contextual, science-informed guidance." },
  { i: ImageIcon, t: "Eco Image Input", d: "Upload a photo of an item and pair it with a question for tailored sustainability guidance." },
  { i: Recycle, t: "Waste Classification", d: "Understand which stream an item belongs to and how to dispose of it responsibly." },
  { i: Wind, t: "Carbon Impact Estimation", d: "Get a plain-language estimate of the environmental footprint of choices you describe." },
  { i: Zap, t: "Energy Saving Suggestions", d: "Receive practical, low-effort ideas to reduce electricity consumption at home." },
  { i: Droplets, t: "Water Conservation Advice", d: "Learn small daily habits that meaningfully cut household water use." },
  { i: Sparkles, t: "Eco-friendly Alternatives", d: "Discover greener substitutes for common everyday products." },
  { i: ShoppingBag, t: "Sustainable Shopping Tips", d: "Get guidance on materials, labels, and lower-impact purchasing choices." },
];

const STEPS = [
  { t: "Ask or Upload", d: "Type a sustainability question or upload an image of an item." },
  { t: "AI Interprets", d: "GreenGuide AI reads your input and identifies relevant environmental context." },
  { t: "Generate Insight", d: "Guidance is generated dynamically from AI reasoning and public sustainability knowledge." },
  { t: "Act on It", d: "Use the recommendation as one input into your own greener decision." },
];

const CAPABILITIES = [
  { i: Recycle, t: "Waste Classification", d: "Identify the likely waste stream (wet, dry, e-waste, hazardous) for an item you describe or upload." },
  { i: Wind, t: "Carbon Impact Estimation", d: "Explain the relative carbon footprint of a habit, product, or choice in accessible terms." },
  { i: Zap, t: "Energy Saving Suggestions", d: "Suggest practical steps to lower home electricity use based on your described situation." },
  { i: Droplets, t: "Water Conservation Advice", d: "Recommend water-saving habits tailored to the activity you mention." },
  { i: Sparkles, t: "Eco-friendly Alternatives", d: "Propose lower-impact substitutes for common single-use or resource-heavy items." },
  { i: ShoppingBag, t: "Sustainable Shopping Tips", d: "Highlight what to look for on labels, materials, and packaging when buying." },
  { i: MapPin, t: "Local Recycling Guidance", d: "Share general guidance on how items are typically routed through recycling systems." },
  { i: FileText, t: "Sustainability Report Summary", d: "Summarize a sustainability topic or document into a short, plain-language brief." },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#hero"><Logo /></a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map(([l, h]) => (
            <a
              key={h}
              href={`#${h}`}
              className="rounded-full px-3.5 py-2 text-sm text-foreground/70 transition hover:bg-leaf/10 hover:text-leaf"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-leaf to-sage px-5 text-white hover:opacity-90"
          >
            <a href="#assistant">
              Try Assistant <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="mx-4 mb-3 rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur-xl md:hidden">
          {NAV.map(([l, h]) => (
            <a
              key={h}
              href={`#${h}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm hover:bg-leaf/10 hover:text-leaf"
            >
              {l}
            </a>
          ))}
          <a
            href="#assistant"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-xl bg-gradient-to-r from-leaf to-sage px-4 py-2.5 text-center text-sm font-medium text-white"
          >
            Try Assistant
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const capabilities = [
    { i: MessageSquare, t: "Ask Sustainability Questions", d: "Chat with an AI assistant about any eco topic." },
    { i: ImageIcon, t: "Upload Images", d: "Get contextual guidance on items you photograph." },
    { i: Sparkles, t: "Receive AI Recommendations", d: "Personalized suggestions generated on demand." },
  ];
  return (
    <section id="hero" className="gradient-hero relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <Lotus className="absolute -top-6 -left-10 opacity-60 animate-float" size={160} />
      <Lotus className="absolute top-24 right-4 opacity-50 animate-float-slow" size={110} />
      <LeafIllu className="absolute bottom-10 left-1/4 opacity-40 animate-float" size={60} />
      <LeafIllu className="absolute -bottom-4 right-1/3 opacity-30 animate-float-slow" size={80} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mx-auto inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-white/60 px-4 py-1.5 text-xs font-medium text-leaf backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered sustainability guidance
          </div>
          <h1 className="animate-fade-up mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl" style={{ animationDelay: "80ms" }}>
            Smarter choices for a{" "}
            <span className="text-gradient-leaf">greener</span>{" "}
            <span className="text-gradient-lotus">tomorrow</span>.
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
            GreenGuide AI turns your everyday questions and images into clear, on-demand
            sustainability guidance — generated dynamically by AI, no account required.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-leaf to-sage px-7 py-6 text-base text-white shadow-[0_16px_40px_-16px] shadow-leaf/60 hover:opacity-95"
            >
              <a href="#assistant">
                Try the Assistant <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-leaf/25 bg-white/60 px-6 py-6 text-base backdrop-blur hover:bg-white"
            >
              <a href="#how">See how it works</a>
            </Button>
          </div>

          <div className="animate-fade-up mt-14 grid grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4" style={{ animationDelay: "320ms" }}>
            {capabilities.map(({ i: Icon, t, d }) => (
              <div key={t} className="glass rounded-2xl p-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-leaf/15 to-lotus/15 text-leaf">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-display text-base font-semibold text-foreground">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf">
            {eyebrow}
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title={<>Everything you need to live <span className="text-gradient-leaf">greener</span>.</>}
      subtitle="A cohesive AI toolkit that turns intent into everyday impact."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ i: Icon, t, d }) => (
          <div
            key={t}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-leaf/40 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-leaf/15 to-lotus/15 text-leaf transition group-hover:from-leaf group-hover:to-sage group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display text-lg font-semibold">{t}</div>
            <div className="mt-1.5 text-sm text-muted-foreground">{d}</div>
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-lotus/20 to-transparent opacity-0 blur-2xl transition group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={<>From input to insight in four steps.</>}
      subtitle="Recommendations are generated on demand using AI reasoning over public sustainability knowledge."
    >
      <div className="grid gap-4 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <div key={s.t} className="relative">
            <div className="glass h-full rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-sage font-display text-lg font-bold text-white">
                  {i + 1}
                </div>
                <div className="font-display text-lg font-semibold">{s.t}</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </div>
            {i < STEPS.length - 1 && (
              <ArrowRight className="absolute top-1/2 -right-3 hidden h-5 w-5 -translate-y-1/2 text-leaf/60 md:block" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

function AssistantSection() {
  return (
    <Section
      id="assistant"
      eyebrow="AI Assistant · Eco Image Input"
      title={<>Talk to your sustainability co-pilot.</>}
      subtitle="Ask a question or upload an image — GreenGuide AI generates guidance dynamically from your input."
    >
      <EcoImageProvider>
        <div className="grid gap-6 lg:grid-cols-2">
          <AiChat />
          <ImageAnalysis />
        </div>
      </EcoImageProvider>
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/60 bg-white/60 p-4 text-xs text-muted-foreground sm:text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
        <p>
          GreenGuide AI provides AI-generated sustainability guidance for educational and
          awareness purposes. Recommendations may vary depending on local regulations and
          should be used as guidance rather than official environmental policy.
        </p>
      </div>
    </Section>
  );
}

function InsightsSection() {
  return (
    <Section
      id="insights"
      eyebrow="AI Decision Insights"
      title={<>What GreenGuide AI can <span className="text-gradient-lotus">generate</span> for you.</>}
      subtitle="These are the kinds of insights the assistant produces on demand from your text or image input. Nothing is stored — every response is generated fresh."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map(({ i: Icon, t, d }) => (
          <div
            key={t}
            className="glass group rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-leaf to-sage text-white">
              <Icon className="h-5 w-5" />
            </div>
            <div className="font-display text-base font-semibold">{t}</div>
            <div className="mt-1.5 text-sm text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section
      id="about"
      eyebrow="Our mission"
      title={<>Making sustainability <span className="text-gradient-leaf">personal</span>.</>}
    >
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <Lotus className="absolute -bottom-6 -left-6 opacity-40" size={160} />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-foreground/85 sm:text-xl">
            GreenGuide AI exists because the biggest barrier to sustainable living isn't
            willingness — it's <em className="text-leaf">clarity</em>. We use AI to translate
            complex environmental information into small, specific, everyday choices —
            generated on demand from your questions and images, without needing an account.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Get in touch with the team.</>}
      subtitle="Built by Yooniq Forge for the Gen AI Academy APAC Hackathon."
    >
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-leaf">Team</div>
          <div className="mt-1 font-display text-2xl font-semibold">Yooniq Forge</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Team Leader
          </p>
          <div className="mt-1 font-medium text-foreground">Debopriya Bose</div>
          <a
            href="mailto:dbose0906@gmail.com"
            className="mt-1 inline-flex items-center gap-1.5 text-sm text-leaf hover:underline"
          >
            <Mail className="h-3.5 w-3.5" /> dbose0906@gmail.com
          </a>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-leaf">Team Member</div>
          <div className="mt-1 font-display text-2xl font-semibold">Kumar Saket</div>
          <a
            href="mailto:exios343@gmail.com"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-leaf hover:underline"
          >
            <Mail className="h-3.5 w-3.5" /> exios343@gmail.com
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border/60 bg-gradient-to-b from-transparent to-cream/60 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
        <Logo />
        <p className="max-w-md text-sm text-muted-foreground">
          AI-generated sustainability guidance — built for the Gen AI Academy APAC Hackathon.
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-earth ring-1 ring-border/60 transition hover:bg-leaf hover:text-white"
        >
          <Github className="h-4 w-4" />
        </a>
        <div className="mt-2 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © 2026 Yooniq Forge. Built for Gen AI Academy APAC Hackathon.
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: 14, border: "1px solid oklch(0.9 0.02 140)" },
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AssistantSection />
        <InsightsSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
