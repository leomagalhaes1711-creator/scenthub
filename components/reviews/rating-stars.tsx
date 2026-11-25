type RatingStarsProps = {
  value: number; // de 0 a 5
  size?: "xs" | "sm" | "md";
  className?: string; // cor das estrelas (por defeito, a tinta)
};

export default function RatingStars({
  value,
  size = "md",
  className = "text-ink",
}: RatingStarsProps) {
  const percent = (Math.min(Math.max(value, 0), 5) / 5) * 100;
  const textSize = size === "xs" ? "text-xs" : size === "sm" ? "text-sm" : "text-xl";

  return (
    <span
      className={`relative inline-block leading-none ${textSize} ${className}`}
      aria-label={`${value.toFixed(1)} de 5 estrelas`}
    >
      <span className="opacity-20">★★★★★</span>
      <span
        className="absolute left-0 top-0 overflow-hidden whitespace-nowrap"
        style={{ width: `${percent}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}