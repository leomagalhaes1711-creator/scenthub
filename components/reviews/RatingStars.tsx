type RatingStarsProps = {
  value: number; // de 0 a 5
  size?: "sm" | "md";
};

export default function RatingStars({ value, size = "md" }: RatingStarsProps) {
  const percent = (Math.min(Math.max(value, 0), 5) / 5) * 100;
  const textSize = size === "sm" ? "text-sm" : "text-xl";

  return (
    <span
      className={`relative inline-block leading-none ${textSize}`}
      aria-label={`${value.toFixed(1)} de 5 estrelas`}
    >
      <span className="text-ink/15">★★★★★</span>
      <span
        className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-amber"
        style={{ width: `${percent}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}