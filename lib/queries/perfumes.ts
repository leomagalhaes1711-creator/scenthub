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
// Tira acentos e maiúsculas: "Âmbar" passa a "ambar"
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Pesquisa por nome ou marca. Sem termo, devolve todos os perfumes.
export async function searchPerfumes(query?: string): Promise<Perfume[]> {
  const term = normalize((query ?? "").trim());

  if (!term) {
    return [...perfumes];
  }

  return perfumes.filter((perfume) =>
    normalize(`${perfume.name} ${perfume.brand}`).includes(term),
  );
}