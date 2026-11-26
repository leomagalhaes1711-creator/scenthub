"use client";

import Image from "next/image";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import { getBottleVariant } from "@/lib/liquid";
import type { Perfume } from "@/types/perfume";

interface PerfumeImageProps {
  perfume: Perfume;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Componente de imagem do perfume - VERSÃO LIMPA E NATURAL
 * - aspect-ratio 4:5
 * - object-cover
 * - SEM máscara radial
 * - SEM fade inferior
 * - SEM blend modes
 * - SEM sombras
 * - SVG fallback simples
 */
export default function PerfumeImage({
  perfume,
  priority = false,
  className = "",
  sizes = "(min-width: 768px) 40vw, 90vw",
}: PerfumeImageProps) {
  const hasPhoto = Boolean(perfume.imageUrl);

  return (
    <div className={`relative w-full max-w-xs mx-auto aspect-[4/5] ${className}`} style={{ maxHeight: "520px" }}>
      {perfume.imageUrl ? (
        <Image
          src={perfume.imageUrl!}
          alt={`Frasco do perfume ${perfume.name}`}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          priority={false}
          className="object-cover transition-opacity duration-300 ease-out"
          style={{ borderRadius: "12px" }}
        />
      ) : (
        <div className="animate-fade-in">
          <PerfumeBottle
            color={perfume.liquidColor}
            variant={getBottleVariant(perfume.id)}
            className="w-full h-auto max-w-xs mx-auto"
          />
        </div>
      )}
    </div>
  );
}