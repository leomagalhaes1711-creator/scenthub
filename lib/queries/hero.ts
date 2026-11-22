import { getNotesByPerfumeId } from "@/lib/queries/notes";
import { getPopularPerfumes, searchPerfumes } from "@/lib/queries/perfumes";
import type { HeroItem } from "@/types/hero";
import type { Perfume } from "@/types/perfume";

// Os perfumes escolhidos para o hero, por ordem
const HERO_IDS = [
  "sauvage",
  "le-male",
  "a-men",
  "boss-bottled",
  "cool-water",
];

export async function getHeroItems(): Promise<HeroItem[]> {
  const all = await searchPerfumes();

  let perfumes = HERO_IDS.map((id) =>
    all.find((perfume) => perfume.id === id),
  ).filter((perfume): perfume is Perfume => Boolean(perfume));

  // Se a lista escolhida não existir na base de dados, usa os populares
  if (perfumes.length < 3) {
    perfumes = await getPopularPerfumes(6);
  }

  return Promise.all(
    perfumes.map(async (perfume) => ({
      perfume,
      notes: await getNotesByPerfumeId(perfume.id),
    })),
  );
}