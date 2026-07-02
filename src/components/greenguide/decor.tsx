export function Lotus({ className = "", size = 80 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lp" cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor="oklch(0.95 0.05 10)" />
          <stop offset="60%" stopColor="oklch(0.82 0.11 5)" />
          <stop offset="100%" stopColor="oklch(0.65 0.14 5)" />
        </radialGradient>
        <radialGradient id="lg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="oklch(0.82 0.09 150)" />
          <stop offset="100%" stopColor="oklch(0.55 0.13 148)" />
        </radialGradient>
      </defs>
      {/* lily pad */}
      <ellipse cx="60" cy="92" rx="52" ry="14" fill="url(#lg)" opacity="0.75" />
      <path d="M60 92 L60 78" stroke="oklch(0.4 0.08 148)" strokeWidth="1" opacity=".4" />
      {/* petals */}
      {[-60, -30, 0, 30, 60].map((r, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="55"
          rx="10"
          ry="26"
          fill="url(#lp)"
          opacity={0.85}
          transform={`rotate(${r} 60 72)`}
        />
      ))}
      <ellipse cx="60" cy="72" rx="8" ry="18" fill="oklch(0.95 0.05 10)" />
      <circle cx="60" cy="70" r="4" fill="oklch(0.85 0.13 85)" />
    </svg>
  );
}

export function Leaf({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true">
      <path
        d="M4 28C4 14 14 4 28 4c0 14-10 24-24 24z"
        fill="oklch(0.72 0.12 148)"
        opacity="0.85"
      />
      <path
        d="M6 26C12 20 20 12 26 6"
        stroke="oklch(0.4 0.08 148)"
        strokeWidth="1.2"
        fill="none"
        opacity=".55"
      />
    </svg>
  );
}
