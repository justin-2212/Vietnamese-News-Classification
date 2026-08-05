import React from "react";
import { motion } from "framer-motion";
import type { Prediction } from "@/lib/classifier";
import { formatPercent } from "@/lib/format";

export function TopThree({ prediction }: { prediction: Prediction }) {
  const entries = Object.entries(prediction.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-baseline justify-between">
        <h4 className="text-sm font-semibold tracking-tight text-foreground">
          Top 3 dự đoán
        </h4>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Xếp hạng theo xác suất
        </div>
      </div>

      <ul className="divide-y divide-border">
        {entries.map(([cat, score], i) => {
          const pct = score * 100;
          const isTop = i === 0;
          return (
            <li key={cat} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 truncate text-sm capitalize ${isTop ? "font-semibold text-foreground" : "font-medium text-foreground/90"}`}
                >
                  {cat}
                </span>
                <span className="font-mono text-sm tabular-nums text-foreground">
                  {formatPercent(score, 2)}
                </span>
              </div>
              <div className="mt-2 ml-8 h-[3px] w-[calc(100%-2rem)] overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className={`h-full rounded-full ${isTop ? "bg-primary" : "bg-foreground/30"}`}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
