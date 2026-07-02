import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  Recycle,
  Wind,
  Zap,
  Droplets,
  Sparkles,
  BarChart3,
  Image as ImageIcon,
  ArrowRight,
  Check,
  Trophy,
  Award,
  Instagram,
  Twitter,
  Github,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { Logo } from "@/components/greenguide/Logo";
import { Lotus, Leaf as LeafIllu } from "@/components/greenguide/decor";
import { AiChat } from "@/components/greenguide/AiChat";
import { ImageAnalysis } from "@/components/greenguide/ImageAnalysis";
import { Dashboard } from "@/components/greenguide/Dashboard";

export const Route = createFileRoute("/")({ component: Home });

const NAV = [
  ["Home", "hero"],
  ["Features", "features"],
  ["How it Works", "how"],
  ["Assistant", "assistant"],
  ["Dashboard", "dashboard"],
  ["About", "about"],
];

const FEATURES = [
  { i: MessageSquare, t: "AI Sustainability Chat", d: "Ask anything — get science-backed, personalized guidance." },
  { i: Recycle, t: "Waste Segregation", d: "Know exactly where each item belongs, in seconds." },
  { i: Wind, t: "Carbon Footprint Insights", d: "Track and shrink your CO₂ across every category." },
  { i: Zap, t: "Energy Saver", d: "Cut your bill with tailored efficiency wins." },
  { i: Droplets, t: "Water Advisor", d: "Small habits, meaningful liters saved every week." },
  { i: Sparkles, t: "Eco Lifestyle Ideas", d: "Discover greener alternatives to daily choices." },
  { i: BarChart3, t: "Sustainability Dashboard", d: "Beautiful analytics for your green journey." },
  { i: ImageIcon, t: "AI Image Analysis", d: "Snap a photo — get instant eco insights." },
];

const STEPS = [
  { t: "Ask or Upload", d: "Type a question or drop an image of anything — waste, plants, bills." },
  { t: "AI Analyzes", d: "GreenGuide AI reads context, category, and impact behind the scenes." },
  { t: "Get Insights", d: "Personalized recommendations — carbon, water, and money saved." },
  { t: "Track Growth", d: "See your Eco Dashboard climb as habits compound." },
];

const TIPS = [
  { cat: "Energy", tip: "Unplug chargers overnight — cuts phantom load by 8–10%." },
  { cat: "Water", tip: "A brick in the toilet tank saves ~4 L per flush." },
  { cat: "Recycling", tip: "Rinse containers before recycling — otherwise they're landfill." },
  { cat: "Food", tip: "Plan meals weekly — households cut food waste by ~30%." },
  { cat: "Transport", tip: "Combine errands into one trip — cold-engine emissions drop." },
  { cat: "Shopping", tip: "Ask: do I need this? Second-hand first cuts 60% footprint." },
  { cat: "Home", tip: "Line-dry clothes on sunny days — free & fabric-friendly." },
];

const BADGES = [
  { name: "Green Beginner", threshold: 20, gradient: "from-sage to-leaf/70", icon: "🌱" },
  { name: "Water Saver", threshold: 40, gradient: "from-sky-300 to-sky-500", icon: "💧" },
  { name: "Recycling Champion", threshold: 55, gradient: "from-emerald-300 to-emerald-500", icon: "♻️" },
  { name: "Energy Expert", threshold: 70, gradient: "from-amber-300 to-amber-500", icon: "⚡" },
  { name: "Eco Warrior", threshold: 82, gradient: "from-lotus to-blush", icon: "🌸" },
  { name: "Earth Protector", threshold: 95, gradient: "from-leaf to-emerald-600", icon: "🌍" },
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
  return (
    <section id="hero" className="gradient-hero relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <Lotus className="absolute -top-6 -left-10 opacity-60 animate-float" size={160} />
      <Lotus className="absolute top-24 right-4 opacity-50 animate-float-slow" size={110} />
      <LeafIllu className="absolute bottom-10 left-1/4 opacity-40 animate-float" size={60} />
      <LeafIllu className="absolute -bottom-4 right-1/3 opacity-30 animate-float-slow" size={80} />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mx-auto inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-white/60 px-4 py-1.5 text-xs font-medium text-leaf backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered sustainability, made personal
          </div>
          <h1 className="animate-fade-up mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl" style={{ animationDelay: "80ms" }}>
            Smarter choices for a{" "}
            <span className="text-gradient-leaf">greener</span>{" "}
            <span className="text-gradient-lotus">tomorrow</span>.
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
            GreenGuide AI analyzes your daily habits, images, and questions to deliver
            personalized sustainability recommendations — from your kitchen to your commute.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "240ms" }}>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-leaf to-sage px-7 py-6 text-base text-white shadow-[0_16px_40px_-16px] shadow-leaf/60 hover:opacity-95"
            >
              <a href="#assistant">
                Start Your Green Journey <ArrowRight className="ml-1.5 h-4 w-4" />
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

          <div className="animate-fade-up mt-14 grid grid-cols-3 gap-3 text-left sm:gap-6" style={{ animationDelay: "320ms" }}>
            {[
              ["1.2M+", "kg CO₂ avoided"],
              ["48K", "eco actions logged"],
              ["96%", "users feel better"],
            ].map(([n, l]) => (
              <div key={l} className="glass rounded-2xl p-4 text-center">
                <div className="font-display text-2xl font-bold text-foreground sm:text-3xl">{n}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">{l}</div>
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
        {FEATURES.map(({ i: Icon, t, d }, idx) => (
          <div
            key={t}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-white/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-leaf/40 hover:shadow-[var(--shadow-glow)]"
            style={{ animationDelay: `${idx * 40}ms` }}
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
      title={<>Four steps to a greener you.</>}
      subtitle="Simple by design — powerful in impact."
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
      eyebrow="AI Assistant · Image Analysis"
      title={<>Talk to your sustainability co-pilot.</>}
      subtitle="Ask a question or drop an image — get instant, personalized guidance."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <AiChat />
        <ImageAnalysis />
      </div>
    </Section>
  );
}

function DashboardSection() {
  return (
    <Section
      id="dashboard"
      eyebrow="Eco Dashboard"
      title={<>Your green journey, <span className="text-gradient-lotus">visualized</span>.</>}
      subtitle="Beautiful analytics keep you motivated — see progress at a glance."
    >
      <Dashboard />
    </Section>
  );
}

function DailyChallenge() {
  const [done, setDone] = useState(false);
  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
      <Lotus className="absolute -right-6 -top-6 opacity-50" size={140} />
      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-lotus/15 px-3 py-1 text-xs font-semibold text-lotus">
            <Sparkles className="h-3.5 w-3.5" /> Daily Green Challenge
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
            Avoid single-use plastic today.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Carry a reusable bottle, refuse plastic bags, and skip disposable cutlery. Small
            choice, big compound effect over the year.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Streak</div>
            <div className="font-display text-2xl font-bold text-leaf">7 days</div>
          </div>
          <Button
            onClick={() => {
              setDone((d) => !d);
              if (!done) toast.success("Challenge completed!", { description: "+10 eco points earned." });
            }}
            className={`rounded-full px-6 py-6 text-white transition ${
              done
                ? "bg-leaf hover:bg-leaf/90"
                : "bg-gradient-to-r from-lotus to-blush text-earth hover:opacity-90"
            }`}
          >
            {done ? (
              <>
                <Check className="mr-1.5 h-4 w-4" /> Completed
              </>
            ) : (
              "Mark as done"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function TipsAndChallenge() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TIPS.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <Section
      id="tips"
      eyebrow="Daily Habits"
      title={<>A tiny action, every day.</>}
      subtitle="Consistency beats intensity — GreenGuide keeps it easy."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DailyChallenge />
        </div>
        <div className="glass-strong flex flex-col rounded-3xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-display text-lg font-semibold">Eco Tip</div>
            <div className="flex gap-1">
              {TIPS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    idx === i ? "bg-leaf w-4" : "bg-leaf/25"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="inline-block rounded-full bg-leaf/10 px-2.5 py-0.5 text-[11px] font-semibold text-leaf">
              {TIPS[i].cat}
            </div>
            <p className="animate-fade-up mt-3 text-lg leading-snug text-foreground" key={i}>
              {TIPS[i].tip}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {Array.from(new Set(TIPS.map((t) => t.cat))).map((c) => (
              <span
                key={c}
                className="rounded-full border border-border/60 bg-white/60 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function Achievements({ score = 78 }: { score?: number }) {
  return (
    <Section
      id="achievements"
      eyebrow="Achievements"
      title={<>Earn badges as you grow.</>}
      subtitle="Gamified milestones that make sustainable habits stick."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {BADGES.map((b) => {
          const unlocked = score >= b.threshold;
          return (
            <div
              key={b.name}
              className={`glass group relative overflow-hidden rounded-2xl p-5 text-center transition ${
                unlocked ? "hover:-translate-y-1" : "opacity-55"
              }`}
            >
              <div
                className={`mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br text-2xl shadow-md ${b.gradient} ${
                  !unlocked && "grayscale"
                }`}
              >
                {b.icon}
              </div>
              <div className="mt-3 text-sm font-semibold">{b.name}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                {unlocked ? (
                  <span className="inline-flex items-center gap-1 text-leaf">
                    <Trophy className="h-3 w-3" /> Unlocked
                  </span>
                ) : (
                  `Reach ${b.threshold} points`
                )}
              </div>
            </div>
          );
        })}
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
            complex environmental science into small, specific, personalized choices that
            compound into real impact. One question, one image, one habit at a time.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-earth ring-1 ring-border/60">
            <Award className="h-4 w-4 text-leaf" />
            "The greatest threat to our planet is the belief that someone else will save it."
            — <span className="font-medium">Robert Swan</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border/60 bg-gradient-to-b from-transparent to-cream/60 px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            GreenGuide AI is a personal sustainability companion. Ready for hackathon
            demo — designed to plug into Gemini API and Google Cloud.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Twitter, Github, Mail].map((I, idx) => (
              <a
                key={idx}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-earth ring-1 ring-border/60 transition hover:bg-leaf hover:text-white"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Product</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Features", "Assistant", "Dashboard", "Achievements"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="hover:text-leaf">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["About", "Privacy Policy", "Terms", "Contact"].map((l) => (
              <li key={l}>
                <a href="#about" className="hover:text-leaf">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} GreenGuide AI. Crafted with 🌱 for a greener tomorrow.</div>
        <div>Made for demo · v1.0</div>
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
        <DashboardSection />
        <TipsAndChallenge />
        <Achievements />
        <About />
      </main>
      <Footer />
    </div>
  );
}
