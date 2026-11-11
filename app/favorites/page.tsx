import { Suspense } from "react";
import { requireUser } from "@/lib/auth/require-user";

export default function FavoritesPage() {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-muted">
          Carregando favoritos...
        </p>
      }
    >
      <FavoritesContent />
    </Suspense>
  );
}

async function FavoritesContent() {
  await requireUser();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
        Meus favoritos
      </h1>
      <p className="mt-2 text-muted">
        Em breve será possível guardar aqui os seus perfumes preferidos.
      </p>
    </main>
  );
}