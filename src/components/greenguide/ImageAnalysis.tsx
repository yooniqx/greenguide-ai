import { useRef } from "react";
import { Upload, ImagePlus, RefreshCw, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useEcoImage } from "@/lib/eco-image-context";

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

export function ImageAnalysis() {
  const { image, setImage } = useEcoImage();
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = async (f: File) => {
    if (f.size > 8 * 1024 * 1024) {
      toast.error("Image is larger than 8MB");
      return;
    }
    if (!f.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    try {
      const dataUrl = await readAsDataUrl(f);
      setImage({
        dataUrl,
        name: f.name,
        type: f.type || "image",
        sizeKb: Math.max(1, Math.round(f.size / 1024)),
      });
      toast.success("Image attached", {
        description: "Ask the assistant a question about it.",
      });
    } catch {
      toast.error("Couldn't read the image");
    }
  };

  const reset = () => {
    setImage(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="glass-strong overflow-hidden rounded-3xl">
      <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-lotus to-blush text-white">
          <ImagePlus className="h-4 w-4" />
        </div>
        <div>
          <div className="font-semibold text-foreground">Eco Image Input</div>
          <div className="text-xs text-muted-foreground">
            Upload an item · the assistant will analyze it
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
            {image ? (
              <img src={image.dataUrl} alt="uploaded preview" className="h-full w-full object-cover" />
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-leaf shadow-sm">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="mt-4 font-medium text-foreground">Upload an image</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WEBP · up to 8MB
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
          {image && (
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="truncate">{image.name}</span>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 text-leaf hover:underline"
              >
                <RefreshCw className="h-3 w-3" /> replace
              </button>
            </div>
          )}
        </div>

        <div className="min-h-[320px]">
          {image ? (
            <div className="animate-fade-up space-y-3 text-sm">
              <div className="rounded-2xl bg-gradient-to-br from-leaf/10 to-sage/10 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-leaf">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Attached to assistant
                </div>
                <div className="mt-1 font-display text-xl font-semibold break-all">
                  {image.name}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 font-medium text-earth">
                    {image.type}
                  </span>
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 font-medium text-earth">
                    {image.sizeKb} KB
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white/60 p-4 ring-1 ring-border/50">
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Next step
                    </div>
                    <div className="mt-1 text-foreground">
                      Ask the assistant a question and it will analyze this image alongside
                      your prompt.
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                      <li>• What eco-friendly actions can I take from this image?</li>
                      <li>• How can I save water here?</li>
                      <li>• How should I dispose of this item?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-white/30 p-6 text-center">
              <div className="text-4xl">🌿</div>
              <div className="mt-3 font-medium">Your image preview</div>
              <p className="mt-1 max-w-[280px] text-xs text-muted-foreground">
                Upload an image to preview it here, then ask the assistant a question
                about it for tailored sustainability guidance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
