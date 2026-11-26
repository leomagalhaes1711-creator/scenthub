import { getNotesByPerfumeId } from "@/lib/queries/notes";
import { getTopRatedPerfumes, searchPerfumes } from "@/lib/queries/perfumes";
import type { HeroItem } from "@/types/hero";
import type { Perfume } from "@/types/perfume";

export async function getHeroItems(): Promise<HeroItem[]> {
  // Busca os perfumes mais bem avaliados (com foto)
  const all = await getTopRatedPerfumes(12);

  // Filtra apenas os que têm foto
  const perfumes = all.filter((perfume): perfume is Perfume => Boolean(perfume.imageUrl));

  // Se não houver nenhum com foto, tenta buscar todos
  if (perfumes.length < 3) {
    const allPerfumes = await searchPerfumes();
    const withPhotos = allPerfumes.filter((p) => p.imageUrl);
    return Promise.all(
      withPhotos.slice(0, 10).map(async (perfume) => ({
        perfume,
        notes: await getNotesByPerfumeId(perfume.id),
      })),
    );
  }

  return Promise.all(
    perfumes.slice(0, 10).map(async (perfume) => ({
      perfume,
      notes: await getNotesByPerfumeId(perfume.id),
    })),
  );
}