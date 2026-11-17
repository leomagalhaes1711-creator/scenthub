import HeroStage from "@/components/home/hero-stage";
import PerfumeSection from "@/components/perfume/perfume-section";
import { getHeroItems } from "@/lib/queries/hero";
import {
  getPopularPerfumes,
  getTopRatedPerfumes,
} from "@/lib/queries/perfumes";

export default async function Home() {
  const [heroItems, popular, topRated] = await Promise.all([
    getHeroItems(),
    getPopularPerfumes(),
    getTopRatedPerfumes(),
  ]);

  return (
    <main>
      <HeroStage items={heroItems} />

      <PerfumeSection title="Perfumes populares" perfumes={popular} />
      <PerfumeSection
        title="Mais bem avaliados"
        perfumes={topRated}
        emptyMessage="Ainda ninguém avaliou perfumes. Quando as avaliações chegarem, os melhores aparecem aqui."
      />
    </main>
  );
}