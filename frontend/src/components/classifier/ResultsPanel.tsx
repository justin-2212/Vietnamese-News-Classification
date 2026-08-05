import React from "react";
import type { Prediction } from "@/lib/classifier";
import { MainPrediction } from "./MainPrediction";
import { TopThree } from "./TopThree";
import { DistributionChart } from "./DistributionChart";
import { MetadataStrip } from "./MetadataStrip";
import { SectionHeader } from "@/components/SectionHeader";

type Props = {
  prediction: Prediction | null;
  loading: boolean;
};

export function ResultsPanel({ prediction, loading }: Props) {
  return (
    <section>
      <SectionHeader
        eyebrow="Output"
        title="Kết quả phân loại"
        subtitle="Dự đoán chính, top-3 và phân phối xác suất trên toàn bộ 14 lớp."
      />

      {!prediction && !loading ? (
        <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Awaiting input
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Nhập một đoạn văn bản và bấm <span className="font-medium text-foreground">Phân loại chủ đề</span> để xem kết quả.
          </p>
        </div>
      ) : null}

      {loading && !prediction ? (
        <div className="rounded-lg border border-border bg-card px-6 py-16 text-center shadow-sm">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Running inference…
          </div>
          <div className="mx-auto mt-4 h-1 w-40 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-1/3 animate-pulse bg-primary" />
          </div>
        </div>
      ) : null}

      {prediction ? (
        <div className="space-y-6">
          <MainPrediction prediction={prediction} />
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <TopThree prediction={prediction} />
            </div>
            <div className="lg:col-span-3">
              <DistributionChart prediction={prediction} />
            </div>
          </div>
          <MetadataStrip prediction={prediction} />
        </div>
      ) : null}
    </section>
  );
}
