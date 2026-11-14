import { cacheLife, cacheTag } from "next/cache";
import { getLiquid, type LiquidEntry } from "@/lib/liquid";
import { createPublicClient } from "@/lib/supabase/public";
import type { NoteType } from "@/types/note";
import type { Perfume } from "@/types/perfume";

// Forma de uma linha da tabela perfumes (com a marca incluída)
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

// Forma de uma linha da view perfume_stats
type StatsRow = {
  perfume_id: string;
  rating_average: number | string;
  rating_count: number;
};

// Forma de uma ligação perfume-nota (com a categoria da nota)
type NoteLinkRow = {
  perfume_id: string;
  type: NoteType;
  notes: { category: string } | null;
};

// Converte os nomes da base de dados (image_url) para os do site (imageUrl)
function toPerfume(
  row: PerfumeRow,
  stats: StatsRow | undefined,
  entries: LiquidEntry[],
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

// Vai buscar todos os perfumes à base de dados.
// O resultado fica em cache e só é refeito quando passa o tempo ou há avaliações novas.
async function getAllPerfumes(): Promise<Perfume[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("perfumes");

  const supabase = createPublicClient();

  const [perfumesResult, statsResult, linksResult] = await Promise.all([
    supabase
      .from("perfumes")
      .select(
        "id, name, image_url, image_bg, release_year, perfumer, description, brands(name)",
      )
      .order("name"),
    supabase
      .from("perfume_stats")
      .select("perfume_id, rating_average, rating_count"),
    supabase.from("perfume_notes").select("perfume_id, type, notes(category)"),
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
    (statsResult.data as StatsRow[]).map((stats): [string, StatsRow] => [
      stats.perfume_id,
      stats,
    ]),
  );

  // Agrupa as notas de cada perfume (só precisamos do nível e da categoria)
  const entriesByPerfume = new Map<string, LiquidEntry[]>();

  for (const link of linksResult.data as unknown as NoteLinkRow[]) {
    if (!link.notes) continue;

    const list = entriesByPerfume.get(link.perfume_id) ?? [];
    list.push({ type: link.type, category: link.notes.category });
    entriesByPerfume.set(link.perfume_id, list);
  }

  return (perfumesResult.data as unknown as PerfumeRow[]).map((row) =>
    toPerfume(row, statsById.get(row.id), entriesByPerfume.get(row.id) ?? []),
  );
}

// Os que têm mais avaliações (os "populares")
export async function getPopularPerfumes(limit = 4): Promise<Perfume[]> {
  const perfumes = await getAllPerfumes();

  return [...perfumes]
    .sort(
      (a, b) =>
        b.ratingCount - a.ratingCount || a.name.localeCompare(b.name, "pt"),
    )
    .slice(0, limit);
}

// Os que têm a melhor nota média (só os que já foram avaliados)
export async function getTopRatedPerfumes(limit = 4): Promise<Perfume[]> {
  const perfumes = await getAllPerfumes();

  return perfumes
    .filter((perfume) => perfume.ratingCount > 0)
    .sort(
      (a, b) =>
        b.ratingAverage - a.ratingAverage || b.ratingCount - a.ratingCount,
    )
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
  const perfumes = await getAllPerfumes();
  const term = normalize((query ?? "").trim());

  if (!term) {
    return perfumes;
  }

  return perfumes.filter((perfume) =>
    normalize(`${perfume.name} ${perfume.brand}`).includes(term),
  );
}

// Devolve um perfume pelo seu id, ou null se não existir
export async function getPerfumeById(id: string): Promise<Perfume | null> {
  const perfumes = await getAllPerfumes();

  return perfumes.find((perfume) => perfume.id === id) ?? null;
}