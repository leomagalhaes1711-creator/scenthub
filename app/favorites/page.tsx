import { Suspense } from "react";
import PerfumeCard from "@/components/perfume/perfume-card";
import PerfumeSection from "@/components/perfume/perfume-section";
import { requireUser } from "@/lib/auth/require-user";
import { getUserFavorites } from "@/lib/queries/favorites";

export default function FavoritesPage() {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-smoke">
          Carregando favoritos...
        </p>
      }
    >
      <FavoritesContent />
    </Suspense>
  );
}

async function FavoritesContent() {
  const { user } = await requireUser();

  const favorites = await getUserFavorites(user.id);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Meus favoritos
      </h1>
      <p className="mt-2 text-smoke">
        {favorites.length}{" "}
        {favorites.length === 1 ? "perfume guardado" : "perfumes guardados"}
      </p>

      {favorites.length > 0 ? (
        <PerfumeSection
          title=""
          perfumes={favorites}
          href=""
          emptyMessage="Ainda não tem perfumes guardados."
          isLoggedIn={true}
        />
      ) : (
        <div className="mt-16 text-center">
          <p className="font-display text-2xl text-ink">Ainda não tem favoritos</p>
          <p className="mt-2 text-smoke">
            Navegue pelos perfumes e clique no coração para guardar os seus preferidos.
          </p>
        </div>
      )}
    </main>
  );
}