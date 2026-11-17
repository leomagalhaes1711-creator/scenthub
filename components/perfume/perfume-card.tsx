import Image from "next/image";
import Link from "next/link";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import RatingStars from "@/components/reviews/rating-stars";
import { getBottleVariant, getTint } from "@/lib/liquid";
import type { Perfume } from "@/types/perfume";

export default function PerfumeCard({ perfume }: { perfume: Perfume }) {
  // Com foto e cor medida: usa a cor do fundo da foto.
  // Caso contrário: usa o tom suave do líquido.
  const background =
    (perfume.imageUrl && perfume.imageBackground) ||
    getTint(perfume.liquidColor);

  return (
    <Link href={`/perfumes/${perfume.id}`} className="group block">
      <div
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md"
        style={{ backgroundColor: background }}
      >
        {perfume.imageUrl ? (
          <Image
            src={perfume.imageUrl}
            alt={`Frasco do perfume ${perfume.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className={`object-contain transition duration-500 group-hover:scale-105 motion-reduce:transition-none ${
              perfume.imageBackground ? "" : "p-8 mix-blend-multiply"
            }`}
          />
        ) : (
          <PerfumeBottle
            color={perfume.liquidColor}
            variant={getBottleVariant(perfume.id)}
            className="h-3/5 transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>

      <h3 className="mt-3 font-display text-lg font-medium leading-tight text-ink underline-offset-4 group-hover:underline">
        {perfume.name}
      </h3>
      <p className="text-sm text-smoke">{perfume.brand}</p>

      <div className="mt-1 flex items-center gap-2 text-sm text-smoke">
        {perfume.ratingCount > 0 ? (
          <>
            <RatingStars value={perfume.ratingAverage} size="sm" />
            <span>
              {perfume.ratingAverage.toFixed(1)} (
              {perfume.ratingCount.toLocaleString("pt-PT")})
            </span>
          </>
        ) : (
          <span>Sem avaliações</span>
        )}
      </div>
    </Link>
  );
}