import { cacheLife, cacheTag } from "next/cache";
import { getLiquid, type LiquidEntry } from "@/lib/liquid";
import { createPublicClient } from "@/lib/supabase/public";
import type { NoteCategory, NoteType } from "@/types/note";
import type { Perfume } from "@/types/perfume";
import { normalize } from "@/lib/perfume-filters";

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

// Filtros disponíveis para a listagem
export interface PerfumeFilters {
  q?: string;
  category?: NoteCategory;
  brand?: string;
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  sort?: "name" | "rating" | "popular" | "newest" | "oldest";
}

// Pesquisa com filtros avançados
export async function searchPerfumesFiltered(
  filters: PerfumeFilters,
): Promise<Perfume[]> {
  const perfumes = await getAllPerfumes();

  let results = perfumes;

  // Busca por texto (nome ou marca)
  if (filters.q) {
    const term = normalize(filters.q.trim());
    results = results.filter((perfume) =>
      normalize(`${perfume.name} ${perfume.brand}`).includes(term),
    );
  }

  // Filtro por categoria dominante (líquido)
  if (filters.category) {
    results = results.filter(
      (perfume) => perfume.liquidCategory === filters.category,
    );
  }

  // Filtro por marca
  if (filters.brand) {
    results = results.filter((perfume) =>
      normalize(perfume.brand).includes(normalize(filters.brand!)),
    );
  }

  // Filtro por ano
  if (filters.yearFrom) {
    results = results.filter(
      (perfume) => perfume.releaseYear && perfume.releaseYear >= filters.yearFrom!,
    );
  }
  if (filters.yearTo) {
    results = results.filter(
      (perfume) => perfume.releaseYear && perfume.releaseYear <= filters.yearTo!,
    );
  }

  // Filtro por avaliação mínima
  if (filters.minRating) {
    results = results.filter(
      (perfume) => perfume.ratingAverage >= filters.minRating!,
    );
  }

  // Ordenação
  const sort = filters.sort ?? "name";
  results.sort((a, b) => {
    switch (sort) {
      case "rating":
        return b.ratingAverage - a.ratingAverage || b.ratingCount - a.ratingCount;
      case "popular":
        return b.ratingCount - a.ratingCount || a.name.localeCompare(b.name, "pt");
      case "newest":
        return (b.releaseYear ?? 0) - (a.releaseYear ?? 0);
      case "oldest":
        return (a.releaseYear ?? 0) - (b.releaseYear ?? 0);
      case "name":
      default:
        return a.name.localeCompare(b.name, "pt");
    }
  });

  return results;
}

// Marcas disponíveis (para o filtro)
export async function getBrands(): Promise<string[]> {
  const perfumes = await getAllPerfumes();
  const brands = [...new Set(perfumes.map((p) => p.brand))].filter(Boolean);
  return brands.sort((a, b) => a.localeCompare(b, "pt"));
}

// Categorias disponíveis (para o filtro)
export function getCategories(): NoteCategory[] {
  return [
    "Cítrico",
    "Especiado",
    "Aromático",
    "Floral",
    "Amadeirado",
    "Doce",
    "Âmbar",
    "Aquático",
    "Verde",
    "Fumado",
  ];
}

// Perfumes similares: mesma categoria dominante (liquidCategory), exceto o atual
export async function getSimilarPerfumes(
  perfumeId: string,
  liquidCategory: NoteCategory | null,
  limit = 4,
): Promise<Perfume[]> {
  if (!liquidCategory) return [];

  const all = await getAllPerfumes();

  return all
    .filter(
      (p) => p.id !== perfumeId && p.liquidCategory === liquidCategory,
    )
    .sort((a, b) => b.ratingAverage - a.ratingAverage || b.ratingCount - a.ratingCount)
    .slice(0, limit);
}