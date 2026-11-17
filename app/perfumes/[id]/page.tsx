import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import PerfumeNotes from "@/components/perfume/perfume-notes";
import RatingStars from "@/components/reviews/rating-stars";
import UserReview from "@/components/reviews/user-review";
import { getBottleVariant, readableTextOn } from "@/lib/liquid";
import { getNotesByPerfumeId } from "@/lib/queries/notes";
import { getPerfumeById } from "@/lib/queries/perfumes";

type PerfumePageProps = {
  params: Promise<{ id: string }>;
};

export default function PerfumePage({ params }: PerfumePageProps) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-smoke">
          Carregando perfume...
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

  // O campo de cor: a cor do fundo da foto, ou a do líquido
  const field =
    (perfume.imageUrl && perfume.imageBackground) || perfume.liquidColor;
  const text = readableTextOn(field);

  return (
    <main>
      <section style={{ backgroundColor: field, color: text }}>
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">
          <Link
            href="/perfumes"
            className="text-sm underline underline-offset-4"
          >
            Voltar aos perfumes
          </Link>

          <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-sm opacity-80">{perfume.brand}</p>
              <h1 className="mt-2 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
                {perfume.name}
              </h1>

              {perfume.ratingCount > 0 ? (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <RatingStars
                    value={perfume.ratingAverage}
                    className="text-current"
                  />
                  <span className="text-lg font-medium">
                    {perfume.ratingAverage.toFixed(1)} de 5
                  </span>
                  <span className="text-sm opacity-75">
                    {perfume.ratingCount.toLocaleString("pt-PT")}{" "}
                    {perfume.ratingCount === 1 ? "avaliação" : "avaliações"}
                  </span>
                </div>
              ) : (
                <p className="mt-6 text-sm opacity-80">Ainda sem avaliações.</p>
              )}

              <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 border-t border-current/30 pt-6">
                <div>
                  <dt className="text-sm opacity-70">Lançamento</dt>
                  <dd className="mt-0.5 font-display text-2xl">
                    {perfume.releaseYear ?? "Não disponível"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm opacity-70">Perfumista</dt>
                  <dd className="mt-0.5 font-display text-2xl leading-tight">
                    {perfume.perfumer ?? "Não disponível"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              {perfume.imageUrl ? (
                <Image
                  src={perfume.imageUrl}
                  alt={`Frasco do perfume ${perfume.name}`}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className={`object-contain [mask-image:radial-gradient(closest-side,black_72%,transparent)] ${
                    perfume.imageBackground ? "" : "mix-blend-multiply"
                  }`}
                />
              ) : (
                <PerfumeBottle
                  color={perfume.liquidColor}
                  variant={getBottleVariant(perfume.id)}
                  className="mx-auto h-full"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {perfume.description && (
          <p className="max-w-2xl text-xl leading-relaxed text-ink md:text-2xl">
            {perfume.description}
          </p>
        )}

        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Pirâmide olfativa
          </h2>
          <PerfumeNotes notes={notes} liquidColor={perfume.liquidColor} />
        </section>

        <section className="mt-16 max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Sua avaliação
          </h2>
          <div className="mt-6">
            <Suspense fallback={<p className="text-smoke">Carregando...</p>}>
              <UserReview perfumeId={perfume.id} />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}