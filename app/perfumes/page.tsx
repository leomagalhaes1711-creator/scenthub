import { Suspense } from "react";
import Link from "next/link";
import PerfumeCard from "@/components/perfume/perfume-card";
import SearchBar from "@/components/ui/search-bar";
import { searchPerfumes } from "@/lib/queries/perfumes";

type PerfumesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default function PerfumesPage({ searchParams }: PerfumesPageProps) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-muted">
          A carregar perfumes...
        </p>
      }
    >
      <PerfumesContent searchParams={searchParams} />
    </Suspense>
  );
}

async function PerfumesContent({ searchParams }: PerfumesPageProps) {
  const { q } = await searchParams;
  const results = await searchPerfumes(q);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
        {q ? `Resultados para "${q}"` : "Todos os perfumes"}
      </h1>
      <p className="mt-2 text-muted">
        {results.length}{" "}
        {results.length === 1 ? "perfume encontrado" : "perfumes encontrados"}
      </p>

      <div className="mt-6">
        <SearchBar defaultValue={q ?? ""} />
      </div>

      {results.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="font-serif text-2xl text-ink">
            Nenhum perfume encontrado
          </p>
          <p className="mt-2 text-muted">
            Experimente outro nome ou marca.
          </p>
          <Link
            href="/perfumes"
            className="mt-6 inline-block rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-amber-dark"
          >
            Ver todos os perfumes
          </Link>
        </div>
      )}
    </main>
  );
}