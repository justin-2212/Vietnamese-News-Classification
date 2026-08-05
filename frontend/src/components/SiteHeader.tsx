export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-xs font-semibold text-primary-foreground">
            Ph
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-foreground">
              PhoBERT Classifier
            </div>
            <div className="text-xs text-muted-foreground">
              Vietnamese news topic classification
            </div>
          </div>
        </div>
        <div className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
          v1.0 · demo
        </div>
      </div>
    </header>
  );
}
