import Link from "next/link";

export default function PerfumeNotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="font-serif text-4xl font-semibold text-ink">
        Perfume não encontrado
      </h1>
      <p className="mt-2 text-muted">
        Este perfume não existe ou foi removido.
      </p>
      <Link
        href="/perfumes"
        className="mt-6 inline-block rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-amber-dark"
      >
        Ver todos os perfumes
      </Link>
    </main>
  );
}