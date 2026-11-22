import Link from "next/link";

export default function PerfumeNotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
        Perfume não encontrado
      </h1>
      <p className="mt-2 text-smoke">
        Este perfume não existe ou foi removido.
      </p>
      <Link
        href="/perfumes"
        className="mt-6 inline-block rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper transition hover:bg-black"
      >
        Ver todos os perfumes
      </Link>
    </main>
  );
}