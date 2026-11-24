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
    <section className="mt-16">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Semelhantes a {currentPerfumeName}
        </h2>
        <Link
          href="/perfumes"
          className="text-sm font-medium text-ink underline underline-offset-4"
        >
          Ver todos os perfumes
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {perfumes.map((perfume) => (
          <PerfumeCard key={perfume.id} perfume={perfume} isLoggedIn={isLoggedIn} />
        ))}
      </div>
    </section>
  );
}