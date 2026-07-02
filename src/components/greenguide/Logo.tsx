export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-leaf/90 to-sage shadow-[0_6px_16px_-6px] shadow-leaf/50">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
          <path d="M12 2c-1.5 4-5 6-5 10a5 5 0 0010 0c0-4-3.5-6-5-10z" opacity=".95" />
          <path d="M12 22v-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display text-lg font-semibold tracking-tight text-foreground">
          Green<span className="text-gradient-lotus">Guide</span>{" "}
          <span className="text-leaf">AI</span>
        </div>
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Smarter · Greener · Tomorrow
        </div>
      </div>
    </div>
  );
}
