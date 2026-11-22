import Link from "next/link";
import PerfumeCard from "@/components/perfume/perfume-card";
import type { Perfume } from "@/types/perfume";

type PerfumeSectionProps = {
  title: string;
  perfumes: Perfume[];
  href?: string;
  emptyMessage?: string;
  isLoggedIn?: boolean;
};

export default function PerfumeSection({
  title,
  perfumes,
  href = "/perfumes",
  emptyMessage = "Ainda não há perfumes para mostrar.",
  isLoggedIn = false,
}: PerfumeSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm font-medium text-ink underline underline-offset-4"
        >
          Ver todos
        </Link>
      </div>

      {perfumes.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      ) : (
        <p className="border-t border-ink/10 py-10 text-smoke">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}