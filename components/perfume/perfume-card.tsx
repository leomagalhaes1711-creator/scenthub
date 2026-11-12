import Link from "next/link";
import PerfumeBottle from "@/components/perfume/PerfumeBottle";
import RatingStars from "@/components/reviews/RatingStars";
import { getBottleVariant, getTint, readableTextOn } from "@/lib/liquid";
import type { Perfume } from "@/types/perfume";

export default function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <Link
      href={`/perfumes/${perfume.id}`}
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="relative flex aspect-[4/5] items-center justify-center"
        style={{ backgroundColor: getTint(perfume.liquidColor) }}
      >
        {perfume.liquidCategory && (
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: perfume.liquidColor,
              color: readableTextOn(perfume.liquidColor),
            }}
          >
            {perfume.liquidCategory}
          </span>
        )}
        <PerfumeBottle
          color={perfume.liquidColor}
          variant={getBottleVariant(perfume.id)}
          className="h-3/5 transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-1 p-4">
        <p className="text-xs uppercase tracking-widest text-muted">
          {perfume.brand}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-tight text-ink">
          {perfume.name}
        </h3>
        <div className="flex items-center gap-2 pt-1">
          {perfume.ratingCount > 0 ? (
            <>
              <RatingStars value={perfume.ratingAverage} size="sm" />
              <span className="text-sm text-muted">
                {perfume.ratingAverage.toFixed(1)} (
                {perfume.ratingCount.toLocaleString("pt-PT")})
              </span>
            </>
          ) : (
            <span className="text-sm text-muted">Sem avaliações</span>
          )}
        </div>
      </div>
    </Link>
  );
}