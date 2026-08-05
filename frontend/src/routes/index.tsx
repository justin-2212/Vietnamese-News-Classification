import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { InputPanel } from "@/components/classifier/InputPanel";
import { ResultsPanel } from "@/components/classifier/ResultsPanel";
import { ModelInfo } from "@/components/ModelInfo";
import { predictTopicRemote, type Prediction } from "@/lib/classifier";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhoBERT Classifier · Phân loại chủ đề tin tức tiếng Việt" },
      {
        name: "description",
        content:
          "Demo học thuật phân loại chủ đề bài báo tiếng Việt bằng mô hình PhoBERT fine-tuned trên 14 lớp.",
      },
      { property: "og:title", content: "PhoBERT Vietnamese News Classifier" },
      {
        property: "og:description",
        content:
          "Nhập một bài báo tiếng Việt và xem dự đoán chủ đề cùng phân phối xác suất.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      const endpoint = import.meta.env.VITE_API_URL || "http://localhost:8000/predict";
      const result = await predictTopicRemote(text, endpoint);
      setPrediction(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đã xảy ra lỗi khi phân loại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1100px] flex-1 px-6 py-10">
        <h1 className="sr-only">
          PhoBERT Vietnamese News Topic Classifier
        </h1>

        <div className="space-y-12">
          <section>
            <SectionHeader
              eyebrow="Input"
              title="Phân loại chủ đề bài báo"
              subtitle="Dán một đoạn văn bản tiếng Việt để mô hình PhoBERT dự đoán chủ đề."
            />
            <InputPanel
              text={text}
              setText={setText}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </section>

          <ResultsPanel prediction={prediction} loading={loading} />

          <ModelInfo />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
