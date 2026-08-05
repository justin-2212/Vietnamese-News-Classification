import React from "react";
import { motion } from "framer-motion";
import type { Prediction } from "@/lib/classifier";
import { confidenceLevel, formatPercent } from "@/lib/format";

const TONE_TEXT: Record<string, string> = {
  veryHigh: "text-primary",
  high: "text-foreground",
  mid: "text-muted-foreground",
  low: "text-destructive",
};

export function MainPrediction({ prediction }: { prediction: Prediction }) {
  const level = confidenceLevel(prediction.confidence);
  const pct = prediction.confidence * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-xl border border-primary/25 bg-card p-8 shadow-sm ring-1 ring-primary/10 md:p-10"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Kết quả dự đoán
      </div>

      <h3 className="mt-3 text-5xl font-semibold leading-[1.05] tracking-tight text-primary capitalize md:text-6xl">
        {prediction.label}
      </h3>

      <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <div className="font-mono text-4xl font-semibold tabular-nums text-foreground md:text-5xl">
          {formatPercent(prediction.confidence, 2)}
        </div>
        <span
          className={`rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium ${TONE_TEXT[level.tone]}`}
        >
          {level.label}
        </span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        Mức độ tin cậy của mô hình
      </div>

      <div className="mt-6">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}
