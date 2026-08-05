import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PLACEHOLDER = `Ví dụ: Tối qua, đội tuyển Việt Nam đã giành chiến thắng 2-1 trước đối thủ trong trận đấu vòng loại. Huấn luyện viên đánh giá cao tinh thần thi đấu của các cầu thủ...`;

const MIN_LEN = 20;

type Props = {
  text: string;
  setText: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
};

export function InputPanel({ text, setText, onSubmit, loading, error }: Props) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const tooShort = chars > 0 && chars < MIN_LEN;
  const canSubmit = chars >= MIN_LEN && !loading;

  return (
    <section>
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Input · Vietnamese text
            </div>
            <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {chars} ký tự · {words} từ
            </div>
          </div>
        </div>

        <Textarea
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          placeholder={PLACEHOLDER}
          spellCheck={false}
          className="min-h-[280px] resize-y rounded-none border-0 px-5 py-4 text-[15px] leading-relaxed shadow-none focus-visible:ring-0 md:min-h-[320px] md:text-base"
        />

        <div className="flex flex-col gap-3 border-t border-border px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            {tooShort
              ? `Cần tối thiểu ${MIN_LEN} ký tự để phân loại.`
              : "Dán hoặc nhập một đoạn văn bản tiếng Việt."}
          </div>
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            size="lg"
            className="w-full sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Đang phân loại…
              </>
            ) : (
              "Phân loại chủ đề"
            )}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}
    </section>
  );
}
