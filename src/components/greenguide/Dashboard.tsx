import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Droplets, Zap, Recycle, Leaf, TrendingUp, Wind } from "lucide-react";

const weekly = [
  { day: "Mon", score: 62, carbon: 42 },
  { day: "Tue", score: 68, carbon: 38 },
  { day: "Wed", score: 71, carbon: 35 },
  { day: "Thu", score: 66, carbon: 40 },
  { day: "Fri", score: 74, carbon: 33 },
  { day: "Sat", score: 78, carbon: 30 },
  { day: "Sun", score: 82, carbon: 28 },
];

const breakdown = [
  { name: "Energy", value: 80, color: "oklch(0.62 0.13 145)" },
  { name: "Water", value: 70, color: "oklch(0.72 0.12 210)" },
  { name: "Waste", value: 75, color: "oklch(0.78 0.11 5)" },
  { name: "Transport", value: 65, color: "oklch(0.8 0.13 85)" },
  { name: "Lifestyle", value: 85, color: "oklch(0.72 0.11 300)" },
];

function Stat({
  icon: Icon,
  label,
  value,
  unit,
  delta,
  tint,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  unit?: string;
  delta: string;
  tint: string;
}) {
  const positive = delta.startsWith("+");
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div
          className="grid h-10 w-10 place-items-center rounded-xl text-white shadow-sm"
          style={{ background: tint }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`text-[11px] font-semibold ${positive ? "text-leaf" : "text-lotus"}`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 flex items-baseline gap-1">
        <div className="font-display text-2xl font-semibold text-foreground">{value}</div>
        {unit && <div className="text-xs text-muted-foreground">{unit}</div>}
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const c = 2 * Math.PI * 52;
  const off = c - (value / 100) * c;
  return (
    <div className="relative grid place-items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r="52" stroke="oklch(0.93 0.02 140)" strokeWidth="10" fill="none" />
        <circle
          cx="70"
          cy="70"
          r="52"
          stroke="url(#ringG)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
        <defs>
          <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.13 145)" />
            <stop offset="100%" stopColor="oklch(0.78 0.11 5)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-3xl font-bold text-foreground">{value}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            / 100
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Stat
        icon={Leaf}
        label="Sustainability Score"
        value="78"
        unit="/100"
        delta="+6"
        tint="linear-gradient(135deg, oklch(0.62 0.13 145), oklch(0.78 0.09 150))"
      />
      <Stat
        icon={Wind}
        label="Carbon Footprint"
        value="143"
        unit="kg"
        delta="-12%"
        tint="linear-gradient(135deg, oklch(0.78 0.11 5), oklch(0.85 0.08 15))"
      />
      <Stat
        icon={Droplets}
        label="Water Saved"
        value="210"
        unit="L"
        delta="+18%"
        tint="linear-gradient(135deg, oklch(0.72 0.12 210), oklch(0.82 0.08 200))"
      />
      <Stat
        icon={Zap}
        label="Energy Efficiency"
        value="82"
        unit="%"
        delta="+8%"
        tint="linear-gradient(135deg, oklch(0.8 0.13 85), oklch(0.88 0.1 90))"
      />
      <Stat
        icon={Recycle}
        label="Waste Recycled"
        value="12.5"
        unit="kg"
        delta="+2.3"
        tint="linear-gradient(135deg, oklch(0.72 0.11 300), oklch(0.82 0.08 290))"
      />

      <div className="glass rounded-2xl p-5 md:col-span-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-semibold">Weekly Eco Progress</div>
            <div className="text-xs text-muted-foreground">
              Score climbing, carbon dropping — nice trend
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf/10 px-2.5 py-1 text-xs font-medium text-leaf">
            <TrendingUp className="h-3 w-3" /> +32% vs last week
          </span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekly} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.02 140)" />
              <XAxis dataKey="day" tick={{ fill: "oklch(0.5 0.03 150)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "oklch(0.5 0.03 150)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid oklch(0.9 0.02 140)",
                  background: "white",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="oklch(0.55 0.13 148)"
                strokeWidth={3}
                dot={{ r: 4, fill: "oklch(0.55 0.13 148)" }}
                activeDot={{ r: 6 }}
                name="Sustainability"
              />
              <Line
                type="monotone"
                dataKey="carbon"
                stroke="oklch(0.78 0.11 5)"
                strokeWidth={3}
                dot={{ r: 4, fill: "oklch(0.78 0.11 5)" }}
                name="Carbon (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 md:col-span-2">
        <div className="mb-3">
          <div className="font-display text-lg font-semibold">Score Breakdown</div>
          <div className="text-xs text-muted-foreground">Category performance snapshot</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative h-40 w-40 shrink-0">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={breakdown}
                  innerRadius={44}
                  outerRadius={68}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {breakdown.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="font-display text-2xl font-bold">78</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  /100
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {breakdown.map((b) => (
              <div key={b.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-foreground/80">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                  {b.name}
                </span>
                <span className="text-muted-foreground">{b.value}/100</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 md:col-span-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="font-display text-lg font-semibold">
              Personalized AI Recommendations
            </div>
            <div className="text-xs text-muted-foreground">Ranked by impact for your habits</div>
          </div>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            ["Switch to LED bulbs", "Save ~₹640/month + 45 kg CO₂/year"],
            ["Home compost wet waste", "Diverts 60% of your kitchen waste"],
            ["Install low-flow aerators", "Cuts tap water use by ~40%"],
            ["1 meat-free day / week", "Saves ~50 kg CO₂/year"],
          ].map(([t, s]) => (
            <li
              key={t}
              className="flex items-start gap-3 rounded-xl bg-white/60 p-3 ring-1 ring-border/50"
            >
              <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-lg bg-leaf/10 text-leaf">
                <Leaf className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-sm font-medium">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-5 md:col-span-2">
        <div className="mb-3">
          <div className="font-display text-lg font-semibold">Monthly Trend</div>
          <div className="text-xs text-muted-foreground">Overall score has grown steadily</div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <ScoreRing value={78} />
          <div className="grid w-full grid-cols-3 gap-2 text-center text-xs">
            {[
              ["Jan", "58"],
              ["Feb", "66"],
              ["Mar", "78"],
            ].map(([m, v]) => (
              <div key={m} className="rounded-lg bg-white/60 py-2 ring-1 ring-border/50">
                <div className="font-display text-lg font-semibold">{v}</div>
                <div className="text-muted-foreground">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
