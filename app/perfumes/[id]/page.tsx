import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BottleIcon from "@/components/perfume/BottleIcon";
import PerfumeNotes from "@/components/perfume/PerfumeNotes";
import RatingStars from "@/components/reviews/RatingStars";
import { getNotesByPerfumeId } from "@/lib/queries/notes";
import { getPerfumeById } from "@/lib/queries/perfumes";

type PerfumePageProps = {
  params: Promise<{ id: string }>;
};

export default function PerfumePage({ params }: PerfumePageProps) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-muted">
          A carregar perfume...
        </p>
      }
    >
      <PerfumeContent params={params} />
    </Suspense>
  );
}

async function PerfumeContent({ params }: PerfumePageProps) {
  const { id } = await params;
  const perfume = await getPerfumeById(id);

  if (!perfume) {
    notFound();
  }

  const notes = await getNotesByPerfumeId(perfume.id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/perfumes"
        className="text-sm font-medium text-muted transition hover:text-amber"
      >
        ← Voltar aos perfumes
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex aspect-[4/5] items-center justify-center rounded-3xl bg-sand/60">
          <BottleIcon className="h-1/2" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.25em] text-muted">
            {perfume.brand}
          </p>
          <h1 className="mt-2 font-serif text-5xl font-semibold leading-tight text-ink md:text-6xl">
            {perfume.name}
          </h1>

          {perfume.ratingCount > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <RatingStars value={perfume.ratingAverage} />
              <span className="text-lg font-medium text-ink">
                {perfume.ratingAverage.toFixed(1)} / 5
              </span>
              <span className="text-sm text-muted">
                · {perfume.ratingCount.toLocaleString("pt-PT")} avaliações
              </span>
            </div>
          ) : (
            <p className="mt-5 text-sm text-muted">
              Ainda sem avaliações. Seja o primeiro a avaliar este perfume.
            </p>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-ink/10 py-6">
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted">
                Ano de lançamento
              </dt>
              <dd className="mt-1 font-serif text-2xl text-ink">
                {perfume.releaseYear ?? "Não disponível"}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-muted">
                Perfumista
              </dt>
              <dd className="mt-1 font-serif text-2xl text-ink">
                {perfume.perfumer ?? "Não disponível"}
              </dd>
            </div>
          </dl>

          <p className="mt-8 leading-relaxed text-muted">
            {perfume.description}
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-center font-serif text-3xl font-semibold text-ink md:text-4xl">
          Pirâmide olfativa
        </h2>
        <PerfumeNotes notes={notes} />
      </section>
    </main>
  );
}