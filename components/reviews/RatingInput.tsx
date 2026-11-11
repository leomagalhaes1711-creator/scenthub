"use client";

import { useState } from "react";

type RatingInputProps = {
  value: number; // 0 = ainda sem avaliação
  onChange: (rating: number) => void;
  disabled?: boolean;
};

export default function RatingInput({
  value,
  onChange,
  disabled = false,
}: RatingInputProps) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div
      role="radiogroup"
      aria-label="Sua avaliação"
      className="inline-flex gap-1"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} ${star === 1 ? "estrela" : "estrelas"}`}
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onFocus={() => setHover(star)}
          onBlur={() => setHover(0)}
          className={`text-4xl leading-none transition hover:scale-110 disabled:cursor-not-allowed ${
            star <= active ? "text-amber" : "text-ink/15"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}