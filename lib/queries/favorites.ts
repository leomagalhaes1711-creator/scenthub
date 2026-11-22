import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Perfume } from "@/types/perfume";
import { getLiquid } from "@/lib/liquid";

type PerfumeRow = {
  id: string;
  name: string;
  image_url: string | null;
  image_bg: string | null;
  release_year: number | null;
  perfumer: string | null;
  description: string | null;
  brands: { name: string } | null;
};

type StatsRow = {
  perfume_id: string;
  rating_average: number | string;
  rating_count: number;
};

type NoteLinkRow = {
  perfume_id: string;
  type: "top" | "heart" | "base";
  notes: { category: string } | null;
};

function toPerfume(
  row: PerfumeRow,
  stats: StatsRow | undefined,
  entries: { type: "top" | "heart" | "base"; category: string }[],
): Perfume {
  const liquid = getLiquid(entries);

  return {
    id: row.id,
    name: row.name,
    brand: row.brands?.name ?? "Marca desconhecida",
    imageUrl: row.image_url,
    imageBackground: row.image_bg,
    releaseYear: row.release_year,
    perfumer: row.perfumer,
    description: row.description ?? "",
    ratingAverage: Number(stats?.rating_average ?? 0),
    ratingCount: stats?.rating_count ?? 0,
    liquidCategory: liquid.category,
    liquidColor: liquid.color,
  };
}

export async function getUserFavorites(
  userId: string,
): Promise<Perfume[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("favorites");

  const supabase = createPublicClient();

  // Busca os IDs dos favoritos do usuário
  const { data: favs, error: favError } = await supabase
    .from("favorites")
    .select("perfume_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (favError) {
    throw new Error(`Erro ao carregar favoritos: ${favError.message}`);
  }

  const perfumeIds = (favs ?? []).map((f) => f.perfume_id);

  if (perfumeIds.length === 0) {
    return [];
  }

  // Busca os perfumes completos (mesma lógica de getAllPerfumes)
  const [perfumesResult, statsResult, linksResult] = await Promise.all([
    supabase
      .from("perfumes")
      .select(
        "id, name, image_url, image_bg, release_year, perfumer, description, brands(name)",
      )
      .in("id", perfumeIds),
    supabase
      .from("perfume_stats")
      .select("perfume_id, rating_average, rating_count")
      .in("perfume_id", perfumeIds),
    supabase
      .from("perfume_notes")
      .select("perfume_id, type, notes(category)")
      .in("perfume_id", perfumeIds),
  ]);

  if (perfumesResult.error) {
    throw new Error(`Erro ao carregar perfumes: ${perfumesResult.error.message}`);
  }
  if (statsResult.error) {
    throw new Error(`Erro ao carregar avaliações: ${statsResult.error.message}`);
  }
  if (linksResult.error) {
    throw new Error(`Erro ao carregar notas: ${linksResult.error.message}`);
  }

  const statsById = new Map<string, StatsRow>(
    (statsResult.data as StatsRow[]).map((s) => [s.perfume_id, s]),
  );

  const entriesByPerfume = new Map<
    string,
    { type: "top" | "heart" | "base"; category: string }[]
  >();

  for (const link of linksResult.data as unknown as NoteLinkRow[]) {
    if (!link.notes) continue;
    const list = entriesByPerfume.get(link.perfume_id) ?? [];
    list.push({ type: link.type, category: link.notes.category });
    entriesByPerfume.set(link.perfume_id, list);
  }

  // Mantém a ordem dos favoritos (mais recente primeiro)
  const perfumeMap = new Map(
    (perfumesResult.data as unknown as PerfumeRow[]).map((p) => [
      p.id,
      toPerfume(p, statsById.get(p.id), entriesByPerfume.get(p.id) ?? []),
    ]),
  );

  return perfumeIds.map((id) => perfumeMap.get(id)!).filter(Boolean);
}