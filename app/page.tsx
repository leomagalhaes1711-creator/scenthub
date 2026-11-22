import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import HeroStage from "@/components/home/hero-stage";
import PerfumeSection from "@/components/perfume/perfume-section";
import { getHeroItems } from "@/lib/queries/hero";
import {
  getPopularPerfumes,
  getTopRatedPerfumes,
} from "@/lib/queries/perfumes";

async function HomeContent() {
  const [heroItems, popular, topRated] = await Promise.all([
    getHeroItems(),
    getPopularPerfumes(),
    getTopRatedPerfumes(),
  ]);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <HeroStage items={heroItems} />

      <PerfumeSection title="Perfumes populares" perfumes={popular} isLoggedIn={Boolean(user)} />
      <PerfumeSection
        title="Mais bem avaliados"
        perfumes={topRated}
        emptyMessage="Ainda ninguém avaliou perfumes. Quando as avaliações chegarem, os melhores aparecem aqui."
        isLoggedIn={Boolean(user)}
      />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-20 text-center text-smoke">
          A carregar...
        </p>
      }
    >
      <HomeContent />
    </Suspense>
  );
}