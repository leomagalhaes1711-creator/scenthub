import { Suspense } from "react";
import Link from "next/link";
import ProfileForm from "@/components/profile/ProfileForm";
import { requireUser } from "@/lib/auth/require-user";

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-muted">
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

  const memberSince = new Date(user.created_at).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-serif text-4xl font-semibold text-ink md:text-5xl">
        Meu perfil
      </h1>
      <p className="mt-2 text-muted">Membro desde {memberSince}</p>

      <section className="mt-10 rounded-3xl border border-ink/10 bg-white/70 p-8">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Dados da conta
        </h2>

        <dl className="mt-6">
          <dt className="text-xs uppercase tracking-widest text-muted">
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
        <h2 className="font-serif text-2xl font-semibold text-ink">
          Meus favoritos
        </h2>
        <p className="mt-2 text-muted">
          Os perfumes que você guardar aparecem aqui.
        </p>
        <Link
          href="/favorites"
          className="mt-4 inline-block text-sm font-medium text-amber transition hover:text-amber-dark"
        >
          Ver meus favoritos →
        </Link>
      </section>
    </main>
  );
}