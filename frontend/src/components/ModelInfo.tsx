import { CATEGORIES } from "@/lib/classifier";
import { SectionHeader } from "./SectionHeader";

const TILES = [
  { label: "Model", value: "PhoBERT" },
  { label: "Task", value: "Vietnamese News Topic Classification" },
  { label: "Classes", value: "14" },
  { label: "Dataset", value: "Vietnamese News Articles" },
];

export function ModelInfo() {
  return (
    <section>
      <SectionHeader eyebrow="Model" title="Thông tin mô hình" />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TILES.map((t) => (
          <div
            key={t.label}
            className="rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t.label}
            </div>
            <div className="mt-2 text-sm font-medium leading-snug text-foreground">
              {t.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Categories · 14
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs capitalize text-foreground/80"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
