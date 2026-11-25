import Link from "next/link";
import { Suspense } from "react";
import PerfumeCard, { PerfumeCardSkeleton } from "@/components/perfume/perfume-card";
import type { Perfume } from "@/types/perfume";

type PerfumeSectionProps = {
  title: string;
  perfumes: Perfume[];
  href?: string;
  emptyMessage?: string;
  isLoggedIn?: boolean;
  loading?: boolean;
};

export default function PerfumeSection({
  title,
  perfumes,
  href = "/perfumes",
  emptyMessage = "Ainda não há perfumes para mostrar.",
  isLoggedIn = false,
  loading = false,
}: PerfumeSectionProps) {
  return (
    <section className="section-base" aria-labelledby={title.toLowerCase().replace(/\s+/g, "-")}>
      <header className="section-header">
        <h2 id={title.toLowerCase().replace(/\s+/g, "-")} className="section-title">
          {title}
        </h2>
        {href && (
          <Link href={href} className="section-link">
            Ver todos
          </Link>
        )}
      </header>

      {loading ? (
        <Suspense fallback={
          <div className="grid-perfumes" role="status" aria-label="A carregar perfumes">
            {[...Array(8)].map((_, i) => <PerfumeCardSkeleton key={i} />)}
          </div>
        }>
          <PerfumeGrid perfumes={perfumes} isLoggedIn={isLoggedIn} />
        </Suspense>
      ) : (
        <PerfumeGrid perfumes={perfumes} isLoggedIn={isLoggedIn} emptyMessage={emptyMessage} />
      )}
    </section>
  );
}

function PerfumeGrid({
  perfumes,
  isLoggedIn,
  emptyMessage,
}: {
  perfumes: Perfume[];
  isLoggedIn?: boolean;
  emptyMessage?: string;
}) {
  if (perfumes.length === 0) {
    return (
      <div className="border-t border-ink/10 py-16 text-center" role="status">
        <p className="text-smoke">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid-perfumes" role="list" aria-label="Lista de perfumes">
      {perfumes.map((perfume, index) => (
        <PerfumeCard
          key={perfume.id}
          perfume={perfume}
          isLoggedIn={isLoggedIn ?? false}
          priority={index < 4}
        />
      ))}
    </div>
  );
}