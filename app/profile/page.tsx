import { Suspense } from "react";
import Link from "next/link";
import PerfumeCard from "@/components/perfume/perfume-card";
import ProfileForm from "@/components/profile/profile-form";
import { requireUser } from "@/lib/auth/require-user";
import { getUserFavorites } from "@/lib/queries/favorites";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-smoke">
          Carregando perfil...
        </p>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {
  const { supabase, user } = await requireUser();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Erro ao carregar o perfil: ${error.message}`);
  }

  const favorites = await getUserFavorites(user.id);
  const recentFavorites = favorites.slice(0, 4);

  const memberSince = new Date(user.created_at).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
        Meu perfil
      </h1>
      <p className="mt-2 text-smoke">Membro desde {memberSince}</p>

      <section className="mt-10 rounded-3xl border border-ink/10 bg-white/70 p-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Dados da conta
        </h2>

        <dl className="mt-6">
          <dt className="text-xs uppercase tracking-widest text-smoke">
            Email
          </dt>
          <dd className="mt-1 text-ink">{user.email}</dd>
        </dl>

        <div className="mt-6 border-t border-ink/10 pt-6">
          <ProfileForm
            userId={user.id}
            initialUsername={profile?.username ?? ""}
          />
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-ink/10 bg-white/70 p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Meus favoritos
            <span className="ml-2 text-lg font-normal text-smoke">({favorites.length})</span>
          </h2>
          <Link
            href="/favorites"
            className="text-sm font-medium text-ink underline underline-offset-2 transition hover:text-smoke"
          >
            Ver todos
          </Link>
        </div>

        {recentFavorites.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {recentFavorites.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} isLoggedIn={true} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-smoke text-center py-8">
            Ainda não tem favoritos.{" "}
            <Link href="/perfumes" className="underline underline-offset-2 hover:text-ink">
              Explore os perfumes
            </Link>{" "}
            e guarde os seus preferidos.
          </p>
        )}
      </section>
    </main>
  );
}