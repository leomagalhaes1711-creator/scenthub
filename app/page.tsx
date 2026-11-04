import PerfumeCard from "@/components/perfume/PerfumeCard";
import { perfumes } from "@/data/perfumes";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 font-serif text-4xl font-semibold text-ink">
        Teste dos cards
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {perfumes.map((perfume) => (
          <PerfumeCard key={perfume.id} perfume={perfume} />
        ))}
      </div>
    </main>
  );
}