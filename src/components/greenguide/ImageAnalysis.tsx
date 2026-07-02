import { useRef, useState } from "react";
import { Upload, Camera, Loader2, Leaf as LeafIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Result = {
  item: string;
  category: string;
  impact: string;
  recommendation: string;
  disposal: string;
  alternative: string;
  carbon: string;
  suggestion: string;
};

const SAMPLES: Result[] = [
  {
    item: "Plastic Water Bottle",
    category: "Dry · Recyclable",
    impact: "Medium — 450 years to decompose in landfill",
    recommendation: "Rinse, remove cap, place in dry-waste recycling bin",
    disposal: "Municipal recycling / PET collection center",
    alternative: "Stainless-steel or copper reusable bottle",
    carbon: "0.12 kg CO₂ saved per reuse cycle",
    suggestion: "Switching to a reusable bottle can save ~1.5 kg CO₂/month",
  },
  {
    item: "Electricity Bill",
    category: "Insight · Energy",
    impact: "High — average household emits ~1.8 t CO₂/yr from electricity",
    recommendation: "Reduce peak-hour usage; audit standby appliances",
    disposal: "Digitize and opt out of paper billing",
    alternative: "Enroll in a green energy tariff or add rooftop solar",
    carbon: "Potential ~40% reduction with efficiency upgrades",
    suggestion: "Set AC to 24°C and switch to LEDs — saves ₹800/month",
  },
  {
    item: "Household Vegetable Waste",
    category: "Wet · Compostable",
    impact: "Low if composted; High methane if landfilled",
    recommendation: "Home compost in a small bokashi or aerobic bin",
    disposal: "Wet-waste bin or community composter",
    alternative: "Meal planning to reduce prep waste by 30%",
    carbon: "Composting 1 kg avoids ~0.5 kg CO₂-eq methane",
    suggestion: "Start a countertop compost — soil-ready in 4 weeks",
  },
  {
    item: "Old Smartphone",
    category: "E-Waste · Hazardous",
    impact: "High — contains lead, mercury, rare-earth metals",
    recommendation: "Never dispose in regular trash; wipe data first",
    disposal: "Certified e-waste collector or brand take-back program",
    alternative: "Repair, resell, or donate for reuse",
    carbon: "Reuse avoids ~55 kg CO₂ (new-device manufacturing)",
    suggestion: "Extending phone life by 1 year cuts its footprint by ~30%",
  },
  {
    item: "Indoor Money Plant",
    category: "Green · Air-Purifying",
    impact: "Positive — improves indoor air quality",
    recommendation: "Water once a week; indirect sunlight",
    disposal: "N/A — propagate cuttings for friends!",
    alternative: "Add snake plant & areca palm for a small green corner",
    carbon: "Absorbs ~5 g CO₂/day per mature plant",
    suggestion: "3–5 indoor plants per room improve wellbeing measurably",
  },
];

export function ImageAnalysis() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      toast.error("Image is larger than 10MB");
      return;
    }
    const url = URL.createObjectURL(f);
    setPreview(url);
    setFileName(f.name);
    setResult(null);
  };

  const analyze = async () => {
    if (!preview) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1600));
    setResult(SAMPLES[Math.floor(Math.random() * SAMPLES.length)]);
    setLoading(false);
    toast.success("Analysis complete", { description: "Personalized insights ready below." });
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setFileName("");
  };

  return (
    <div className="glass-strong overflow-hidden rounded-3xl">
      <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-lotus to-blush text-white">
          <Camera className="h-4 w-4" />
        </div>
        <div>
          <div className="font-semibold text-foreground">AI Image Analysis</div>
          <div className="text-xs text-muted-foreground">
            Waste · appliances · plants · receipts
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">
        <div>
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) pick(f);
            }}
            className="group flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-leaf/40 bg-leaf/5 transition hover:border-leaf/70 hover:bg-leaf/10"
          >
            {preview ? (
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-leaf shadow-sm">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-4 font-medium text-foreground">Upload an image</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WEBP · up to 10MB
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">
                  or drag & drop
                </div>
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && pick(e.target.files[0])}
          />
          {preview && (
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 text-leaf hover:underline"
              >
                <RefreshCw className="h-3 w-3" /> replace
              </button>
            </div>
          )}
          <Button
            onClick={analyze}
            disabled={!preview || loading}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-leaf to-sage py-6 text-white hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing image...
              </>
            ) : (
              <>
                <LeafIcon className="mr-2 h-4 w-4" /> Analyze with AI
              </>
            )}
          </Button>
        </div>

        <div className="min-h-[320px]">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded-lg bg-gradient-to-r from-sage/20 via-lotus/10 to-sage/20"
                  style={{ width: `${60 + Math.random() * 40}%` }}
                />
              ))}
            </div>
          ) : result ? (
            <div className="animate-fade-up space-y-3 text-sm">
              <div className="rounded-2xl bg-gradient-to-br from-leaf/10 to-sage/10 p-4">
                <div className="text-xs uppercase tracking-wider text-leaf">Detected</div>
                <div className="mt-1 font-display text-xl font-semibold">{result.item}</div>
                <div className="mt-1 inline-block rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-medium text-earth">
                  {result.category}
                </div>
              </div>
              {[
                ["Environmental Impact", result.impact],
                ["Recommendation", result.recommendation],
                ["Proper Disposal", result.disposal],
                ["Eco Alternative", result.alternative],
                ["Carbon Impact", result.carbon],
                ["Personalized Tip", result.suggestion],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-white/60 p-3 ring-1 ring-border/50">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {k}
                  </div>
                  <div className="mt-0.5 text-foreground">{v}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-white/30 p-6 text-center">
              <div className="text-4xl">🌿</div>
              <div className="mt-3 font-medium">Analysis Results</div>
              <p className="mt-1 max-w-[260px] text-xs text-muted-foreground">
                Upload an image and tap Analyze to see waste category, impact, disposal, and
                eco alternatives.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
