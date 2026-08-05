import React from "react";
import { motion } from "framer-motion";
import type { Prediction, Category } from "@/lib/classifier";
import { formatPercent } from "@/lib/format";

export function DistributionChart({ prediction }: { prediction: Prediction }) {
  const entries = (Object.entries(prediction.scores) as [Category, number][]).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-baseline justify-between">
        <h4 className="text-sm font-semibold tracking-tight text-foreground">
          Phân phối xác suất
        </h4>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Tất cả 14 lớp
        </div>
      </div>

      <ul className="space-y-2">
        {entries.map(([cat, score], i) => {
          const pct = score * 100;
          const isPredicted = cat === prediction.label;
          return (
            <li
              key={cat}
              className="grid grid-cols-[96px_1fr_56px] items-center gap-3 sm:grid-cols-[140px_1fr_64px]"
            >
              <span
                className={`truncate text-right text-xs capitalize sm:text-sm ${isPredicted ? "font-semibold text-primary" : "text-foreground/80"}`}
                title={cat}
              >
                {cat}
              </span>
              <div className="relative h-2 w-full overflow-hidden rounded-sm bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.025 }}
                  className={`h-full rounded-sm ${isPredicted ? "bg-primary" : "bg-foreground/25"}`}
                />
              </div>
              <span
                className={`text-right font-mono text-xs tabular-nums sm:text-sm ${isPredicted ? "text-primary" : "text-muted-foreground"}`}
              >
                {pct.toFixed(2)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
