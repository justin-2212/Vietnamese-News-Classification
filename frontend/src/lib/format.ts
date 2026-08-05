export function formatPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export type ConfidenceTone = "low" | "mid" | "high" | "veryHigh";

export function confidenceLevel(c: number): { label: string; tone: ConfidenceTone } {
  if (c >= 0.9) return { label: "Rất cao", tone: "veryHigh" };
  if (c >= 0.7) return { label: "Cao", tone: "high" };
  if (c >= 0.5) return { label: "Trung bình", tone: "mid" };
  return { label: "Thấp", tone: "low" };
}
