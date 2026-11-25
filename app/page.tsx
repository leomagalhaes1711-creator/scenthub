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

      <PerfumeSection
        title="Perfumes populares"
        perfumes={popular}
        isLoggedIn={Boolean(user)}
        loading={false}
      />
      <PerfumeSection
        title="Mais bem avaliados"
        perfumes={topRated}
        emptyMessage="Ainda ninguém avaliou perfumes. Quando as avaliações chegarem, os melhores aparecem aqui."
        isLoggedIn={Boolean(user)}
        loading={false}
      />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-20">
          <div className="skeleton-image max-w-xs mx-auto mb-8" />
          <div className="skeleton-title max-w-md mx-auto mb-4" />
          <div className="skeleton-text max-w-md mx-auto mb-8" />
          <div className="grid-perfumes" role="status" aria-label="A carregar perfumes">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-perfume">
                <div className="card-perfume-image skeleton-image" />
                <div className="card-perfume-info">
                  <div className="skeleton-title" />
                  <div className="skeleton-text-short mt-2" />
                  <div className="skeleton-text-short mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}