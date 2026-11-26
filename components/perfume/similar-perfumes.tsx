import Link from "next/link";
import PerfumeCard from "@/components/perfume/perfume-card";
import type { Perfume } from "@/types/perfume";

type SimilarPerfumesProps = {
  perfumes: Perfume[];
  currentPerfumeName: string;
  isLoggedIn?: boolean;
};

export default function SimilarPerfumes({
  perfumes,
  currentPerfumeName,
  isLoggedIn = false,
}: SimilarPerfumesProps) {
  if (perfumes.length === 0) return null;

  return (
    <section className="mt-16 animate-reveal">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="text-display-3 text-ink">
          Semelhantes a {currentPerfumeName}
        </h2>
        <Link
          href="/perfumes"
          className="section-link"
        >
          Ver todos os perfumes
        </Link>
      </div>

      <div className="grid-perfumes" role="list" aria-label="Perfumes semelhantes">
        {perfumes.map((perfume) => (
          <PerfumeCard
            key={perfume.id}
            perfume={perfume}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
}