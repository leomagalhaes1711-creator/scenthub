import Image from "next/image";
import Link from "next/link";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import RatingStars from "@/components/reviews/rating-stars";
import FavoriteButton from "@/components/perfume/favorite-button";
import PerfumeImage from "@/components/perfume/perfume-image";
import { getBottleVariant, getTint } from "@/lib/liquid";
import type { Perfume } from "@/types/perfume";

interface PerfumeCardProps {
  perfume: Perfume;
  isLoggedIn?: boolean;
  priority?: boolean;
}

export default function PerfumeCard({
  perfume,
  isLoggedIn = false,
  priority = false,
}: PerfumeCardProps) {
  const hasPhoto = Boolean(perfume.imageUrl);

  return (
    <article className="card-perfume group">
      <Link href={`/perfumes/${perfume.id}`} className="block group" aria-label={`${perfume.name} por ${perfume.brand}`}>
        {/* Imagem do frasco - usando o componente PerfumeImage com design limpo */}
        <div className="card-perfume-image">
          <PerfumeImage
            perfume={perfume}
            priority={priority}
          />

          {/* Botão favorito - top right */}
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FavoriteButton perfumeId={perfume.id} isLoggedIn={isLoggedIn} />
          </div>

          {/* Badge de avaliação - bottom left */}
          {perfume.ratingCount > 0 && (
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-paper text-xs font-medium">
              <RatingStars value={perfume.ratingAverage} size="xs" className="text-yellow-400" />
              <span className="whitespace-nowrap">{perfume.ratingAverage.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Info do perfume */}
        <div className="card-perfume-info">
          <h3 className="card-perfume-name">{perfume.name}</h3>
          <p className="card-perfume-brand">{perfume.brand}</p>

          <div className="card-perfume-rating" aria-label={`Avaliação média ${perfume.ratingAverage.toFixed(1)} de 5, ${perfume.ratingCount} avaliações`}>
            {perfume.ratingCount > 0 ? (
              <>
                <RatingStars value={perfume.ratingAverage} size="sm" />
                <span className="text-smoke">
                  {perfume.ratingAverage.toFixed(1)} ({perfume.ratingCount.toLocaleString("pt-PT")})
                </span>
              </>
            ) : (
              <span className="text-smoke">Sem avaliações</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

/* Skeleton para loading state */
export function PerfumeCardSkeleton() {
  return (
    <article className="card-perfume" aria-hidden="true">
      <div className="card-perfume-image skeleton-image" />
      <div className="card-perfume-info">
        <div className="skeleton-title" />
        <div className="skeleton-text-short mt-2" />
        <div className="skeleton-text-short mt-3" />
      </div>
    </article>
  );
}