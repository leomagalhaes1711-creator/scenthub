import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { Perfume } from "@/types/perfume";

// Forma de uma linha da tabela perfumes (com a marca incluída)
type PerfumeRow = {
  id: string;
  name: string;
  image_url: string | null;
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

// Converte os nomes da base de dados (image_url) para os do site (imageUrl)
function toPerfume(row: PerfumeRow, stats?: StatsRow): Perfume {
  return {
    id: row.id,
    name: row.name,
    brand: row.brands?.name ?? "Marca desconhecida",
    imageUrl: row.image_url,
    releaseYear: row.release_year,
    perfumer: row.perfumer,
    description: row.description ?? "",
    ratingAverage: Number(stats?.rating_average ?? 0),
    ratingCount: stats?.rating_count ?? 0,
  };
}

// Vai buscar todos os perfumes à base de dados.
// O resultado fica em cache durante alguns minutos.
async function getAllPerfumes(): Promise<Perfume[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("perfumes");

  const supabase = createPublicClient();

  const [perfumesResult, statsResult] = await Promise.all([
    supabase
      .from("perfumes")
      .select(
        "id, name, image_url, release_year, perfumer, description, brands(name)",
      )
      .order("name"),
    supabase
      .from("perfume_stats")
      .select("perfume_id, rating_average, rating_count"),
  ]);

  if (perfumesResult.error) {
    throw new Error(`Erro ao carregar perfumes: ${perfumesResult.error.message}`);
  }
  if (statsResult.error) {
    throw new Error(`Erro ao carregar avaliações: ${statsResult.error.message}`);
  }

  const statsById = new Map<string, StatsRow>(
    (statsResult.data as StatsRow[]).map((stats): [string, StatsRow] => [
      stats.perfume_id,
      stats,
    ]),
  );

  return (perfumesResult.data as unknown as PerfumeRow[]).map((row) =>
    toPerfume(row, statsById.get(row.id)),
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