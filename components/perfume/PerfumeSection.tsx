import Link from "next/link";
import PerfumeCard from "@/components/perfume/PerfumeCard";
import type { Perfume } from "@/types/perfume";

type PerfumeSectionProps = {
  title: string;
  perfumes: Perfume[];
  href?: string;
  emptyMessage?: string;
};

export default function PerfumeSection({
  title,
  perfumes,
  href = "/perfumes",
  emptyMessage = "Ainda não há perfumes para mostrar.",
}: PerfumeSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-serif text-3xl font-semibold text-ink">{title}</h2>
        <Link
          href={href}
          className="text-sm font-medium text-amber transition hover:text-amber-dark"
        >
          Ver todos →
        </Link>
      </div>

      {perfumes.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {perfumes.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-ink/20 px-6 py-10 text-center text-muted">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}