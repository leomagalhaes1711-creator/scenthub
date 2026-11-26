import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import PerfumeNotes from "@/components/perfume/perfume-notes";
import RatingStars from "@/components/reviews/rating-stars";
import UserReview from "@/components/reviews/user-review";
import CommentList from "@/components/reviews/comment-list";
import FavoriteButton from "@/components/perfume/favorite-button";
import SimilarPerfumes from "@/components/perfume/similar-perfumes";
import PerfumeImage from "@/components/perfume/perfume-image";
import { getBottleVariant, readableTextOn } from "@/lib/liquid";
import { getNotesByPerfumeId } from "@/lib/queries/notes";
import {
  getPerfumeById,
  getSimilarPerfumes,
} from "@/lib/queries/perfumes";

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

  // Perfumes similares (mesma categoria dominante)
  const similar = await getSimilarPerfumes(
    perfume.id,
    perfume.liquidCategory,
  );

  // Usuário atual para os comentários
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
                  <FavoriteButton perfumeId={perfume.id} isLoggedIn={Boolean(user)} />
                </div>
              ) : (
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <p className="text-sm opacity-80">Ainda sem avaliações.</p>
                  <FavoriteButton perfumeId={perfume.id} isLoggedIn={Boolean(user)} />
                </div>
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

            {/* Imagem do perfume - usando o componente PerfumeImage com design do hero */}
            <PerfumeImage perfume={perfume} priority />
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

        <section className="mt-16 max-w-2xl">
          <CommentList perfumeId={perfume.id} currentUserId={user?.id ?? null} />
        </section>

        <Suspense fallback={<p className="mt-16 text-center text-smoke">A carregar semelhantes...</p>}>
          <SimilarPerfumes
            perfumes={similar}
            currentPerfumeName={perfume.name}
            isLoggedIn={Boolean(user)}
          />
        </Suspense>
      </div>
    </main>
  );
}