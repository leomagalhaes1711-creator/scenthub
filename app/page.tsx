export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-amber">
        Em construção
      </p>
      <h1 className="font-serif text-6xl font-semibold text-ink md:text-7xl">
        ScentHub
      </h1>
      <p className="max-w-md text-muted">
        Descubra o seu próximo perfume.
      </p>
      <button className="mt-4 rounded-full bg-amber px-8 py-3 text-sm font-medium text-cream transition hover:bg-amber-dark">
        Explorar
      </button>
    </main>
  );
}