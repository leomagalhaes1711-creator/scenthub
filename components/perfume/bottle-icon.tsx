export default function BottleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" fill="none" className={className} aria-hidden="true">
      <rect x="26" y="4" width="12" height="8" rx="2" className="fill-amber-dark" />
      <rect x="29" y="12" width="6" height="6" className="fill-amber" />
      <rect
        x="12"
        y="18"
        width="40"
        height="58"
        rx="10"
        strokeWidth="2"
        className="fill-amber/20 stroke-amber"
      />
      <rect x="20" y="40" width="24" height="16" rx="3" className="fill-cream/80" />
    </svg>
  );
}