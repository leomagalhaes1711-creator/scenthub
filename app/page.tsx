import PerfumeSection from "@/components/perfume/PerfumeSection";
import SearchBar from "@/components/ui/SearchBar";
import {
  getPopularPerfumes,
  getTopRatedPerfumes,
} from "@/lib/queries/perfumes";

export default async function Home() {
  const [popular, topRated] = await Promise.all([
    getPopularPerfumes(),
    getTopRatedPerfumes(),
  ]);

  return (
    <main>
      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
        <p className="text-sm uppercase tracking-[0.3em] text-amber">
          A sua jornada olfativa
        </p>
        <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-tight text-ink md:text-7xl">
          Descubra o seu próximo perfume
        </h1>
        <p className="max-w-xl text-muted">
          Explore notas, leia opiniões da comunidade e guarde os seus favoritos.
        </p>
        <SearchBar />
      </section>

      <PerfumeSection title="Perfumes populares" perfumes={popular} />
      <PerfumeSection title="Mais bem avaliados" perfumes={topRated} />
    </main>
  );
}