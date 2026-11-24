import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PerfumeCard from "@/components/perfume/perfume-card";
import SearchBar from "@/components/ui/search-bar";
import FilterSidebar from "@/components/perfume/filter-sidebar";
import {
  searchPerfumesFiltered,
  getBrands,
  type PerfumeFilters,
} from "@/lib/queries/perfumes";
import type { NoteCategory } from "@/types/note";

type PerfumesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function PerfumesPage({ searchParams }: PerfumesPageProps) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-smoke">
          A carregar perfumes...
        </p>
      }
    >
      <PerfumesContent searchParams={searchParams} />
    </Suspense>
  );
}

// Converte parâmetros de string (URL) para os tipos corretos
function parseFilters(raw: Record<string, string | string[] | undefined>): PerfumeFilters {
  const get = (key: string) => {
    const v = raw[key];
    return Array.isArray(v) ? v[0] : v;
  };

  return {
    q: get("q"),
    category: get("category") as PerfumeFilters["category"],
    brand: get("brand"),
    yearFrom: get("yearFrom") ? Number(get("yearFrom")) : undefined,
    yearTo: get("yearTo") ? Number(get("yearTo")) : undefined,
    minRating: get("minRating") ? Number(get("minRating")) : undefined,
    sort: get("sort") as PerfumeFilters["sort"],
  };
}

async function PerfumesContent({ searchParams }: PerfumesPageProps) {
  const rawFilters = await searchParams;
  const filters = parseFilters(rawFilters);
  const [results, brands] = await Promise.all([
    searchPerfumesFiltered(filters),
    getBrands(),
  ]);

  // Para o FilterSidebar, usa os valores raw (strings)
  const getFirst = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const sidebarFilters = {
    q: getFirst(rawFilters.q),
    category: getFirst(rawFilters.category) as NoteCategory | undefined,
    brand: getFirst(rawFilters.brand),
    yearFrom: getFirst(rawFilters.yearFrom),
    yearTo: getFirst(rawFilters.yearTo),
    minRating: getFirst(rawFilters.minRating),
    sort: getFirst(rawFilters.sort),
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasFilters = Object.keys(filters).some(
    (k) => k !== "q" && filters[k as keyof PerfumeFilters],
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Sidebar de filtros */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <FilterSidebar brands={brands} currentFilters={sidebarFilters} />
        </aside>

        {/* Conteúdo principal */}
        <div className="mt-6 lg:mt-0">
          <header className="mb-6">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              {filters.q ? `Resultados para "${filters.q}"` : "Todos os perfumes"}
            </h1>
            <p className="mt-2 text-smoke">
              {results.length}{" "}
              {results.length === 1 ? "perfume encontrado" : "perfumes encontrados"}
              {hasFilters && (
                <span className="ml-2 text-sm font-medium text-ink/60">(filtrado)</span>
              )}
            </p>
          </header>

          <div className="mb-6 lg:hidden">
            <SearchBar defaultValue={filters.q ?? ""} />
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {results.map((perfume) => (
                <PerfumeCard
                  key={perfume.id}
                  perfume={perfume}
                  isLoggedIn={Boolean(user)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="font-display text-2xl text-ink">
                Nenhum perfume encontrado
              </p>
              <p className="mt-2 text-smoke">
                {hasFilters
                  ? "Tente ajustar os filtros ou limpar a pesquisa."
                  : "Experimente outro nome ou marca."}
              </p>
              <Link
                href="/perfumes"
                className="mt-6 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper transition hover:bg-black"
              >
                {hasFilters ? "Limpar filtros" : "Ver todos os perfumes"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}