import { perfumes } from "@/data/perfumes";
import type { Perfume } from "@/types/perfume";

// Os mais avaliados em número de avaliações (os "populares")
export async function getPopularPerfumes(limit = 4): Promise<Perfume[]> {
  return [...perfumes]
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, limit);
}

// Os que têm a melhor nota média
export async function getTopRatedPerfumes(limit = 4): Promise<Perfume[]> {
  return [...perfumes]
    .sort((a, b) => b.ratingAverage - a.ratingAverage)
    .slice(0, limit);
}