import React from "react";
import type { Prediction } from "@/lib/classifier";
import { formatTimestamp } from "@/lib/format";

export function MetadataStrip({ prediction }: { prediction: Prediction }) {
  const items = [
    { label: "Model", value: "PhoBERT" },
    { label: "Processing", value: `${prediction.processingTimeMs} ms` },
    { label: "Timestamp", value: formatTimestamp(prediction.timestamp) },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-xs text-muted-foreground">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
            {it.label}
          </span>
          <span className="font-mono tabular-nums text-foreground/80">{it.value}</span>
        </div>
      ))}
    </div>
  );
}
