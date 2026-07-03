import { useRef, useState } from "react";
import { Upload, Camera, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type FileMeta = {
  name: string;
  type: string;
  sizeKb: number;
};

export function ImageAnalysis() {
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<FileMeta | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      toast.error("Image is larger than 10MB");
      return;
    }
    if (!f.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const url = URL.createObjectURL(f);
    setPreview(url);
    setMeta({
      name: f.name,
      type: f.type || "unknown",
      sizeKb: Math.max(1, Math.round(f.size / 1024)),
    });
    toast.success("Image ready", {
      description: "Awaiting Gemini Vision API integration for real analysis.",
    });
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setMeta(null);
    if (inputRef.current) inputRef.current.value = "";
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
            Upload an item · analysis pending API integration
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
              <img src={preview} alt="uploaded preview" className="h-full w-full object-cover" />
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-leaf shadow-sm">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-4 font-medium text-foreground">Upload an image</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WEBP · up to 10MB
                </div>
                <div className="mt-3 text-[11px] text-muted-foreground">or drag & drop</div>
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
              <span className="truncate">{meta?.name}</span>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 text-leaf hover:underline"
              >
                <RefreshCw className="h-3 w-3" /> replace
              </button>
            </div>
          )}
          <Button
            disabled
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-leaf to-sage py-6 text-white opacity-80"
            title="Available after Gemini Vision API integration"
          >
            Analyze with AI (coming soon)
          </Button>
        </div>

        <div className="min-h-[320px]">
          {meta ? (
            <div className="animate-fade-up space-y-3 text-sm">
              <div className="rounded-2xl bg-gradient-to-br from-leaf/10 to-sage/10 p-4">
                <div className="text-xs uppercase tracking-wider text-leaf">Uploaded</div>
                <div className="mt-1 font-display text-xl font-semibold break-all">
                  {meta.name}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 font-medium text-earth">
                    {meta.type}
                  </span>
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 font-medium text-earth">
                    {meta.sizeKb} KB
                  </span>
                  <span className="rounded-full bg-leaf/15 px-2.5 py-0.5 font-medium text-leaf">
                    Ready for AI analysis
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white/60 p-4 ring-1 ring-border/50">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-lotus" />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Analysis status
                    </div>
                    <div className="mt-1 text-foreground">
                      AI image analysis will be available after Gemini Vision API integration.
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Connect Gemini Vision API to generate waste category, environmental
                      impact, disposal method, and eco recommendations from the uploaded
                      image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-white/30 p-6 text-center">
              <div className="text-4xl">🌿</div>
              <div className="mt-3 font-medium">Analysis Results</div>
              <p className="mt-1 max-w-[280px] text-xs text-muted-foreground">
                Upload an image to see its details here. Full AI-generated insights arrive
                once Gemini Vision API is connected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
