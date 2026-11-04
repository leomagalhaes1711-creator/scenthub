import Link from "next/link";
import BottleIcon from "@/components/perfume/BottleIcon";
import RatingStars from "@/components/reviews/RatingStars";
import type { Perfume } from "@/types/perfume";

export default function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <Link
      href={`/perfumes/${perfume.id}`}
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex aspect-[4/5] items-center justify-center bg-sand/60">
        <BottleIcon className="h-1/2 transition duration-300 group-hover:scale-110" />
      </div>

      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-widest text-muted">
          {perfume.brand}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-tight text-ink">
          {perfume.name}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          <RatingStars value={perfume.ratingAverage} size="sm" />
          <span className="text-sm text-muted">
            {perfume.ratingAverage.toFixed(1)} (
            {perfume.ratingCount.toLocaleString("pt-PT")})
          </span>
        </div>
      </div>
    </Link>
  );
}