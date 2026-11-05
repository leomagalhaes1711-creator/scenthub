"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
    const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/perfumes?q=${encodeURIComponent(term)}` : "/perfumes");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full max-w-xl items-center gap-2 rounded-full border border-ink/15 bg-white/80 p-1.5 shadow-sm transition focus-within:border-amber focus-within:shadow-md"
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Pesquise por perfume ou marca..."
        aria-label="Pesquisar perfumes"
        className="min-w-0 flex-1 bg-transparent px-4 py-2 text-ink placeholder:text-muted/70 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-amber px-6 py-2 text-sm font-medium text-cream transition hover:bg-amber-dark"
      >
        Pesquisar
      </button>
    </form>
  );
}