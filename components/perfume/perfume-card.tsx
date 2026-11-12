import Image from "next/image";
import Link from "next/link";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import RatingStars from "@/components/reviews/rating-stars";
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
        {perfume.imageUrl ? (
          <Image
            src={perfume.imageUrl}
            alt={`Frasco do perfume ${perfume.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-contain p-8 mix-blend-multiply transition duration-300 group-hover:scale-105"
          />
        ) : (
          <PerfumeBottle
            color={perfume.liquidColor}
            variant={getBottleVariant(perfume.id)}
            className="h-3/5 transition duration-300 group-hover:scale-105"
          />
        )}

        {perfume.liquidCategory && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: perfume.liquidColor,
              color: readableTextOn(perfume.liquidColor),
            }}
          >
            {perfume.liquidCategory}
          </span>
        )}
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