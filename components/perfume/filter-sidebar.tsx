"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, useEffect } from "react";
import { getCategories } from "@/lib/perfume-filters";
import type { NoteCategory } from "@/types/note";

type FilterSidebarProps = {
  brands: string[];
  currentFilters: {
    q?: string;
    category?: NoteCategory;
    brand?: string;
    yearFrom?: string;
    yearTo?: string;
    minRating?: string;
    sort?: string;
  };
};

export default function FilterSidebar({ brands, currentFilters }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(currentFilters);

  // Sincroniza com URL ao montar
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  function handleChange(
    key: keyof typeof localFilters,
    value: string | undefined,
  ) {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();

    Object.entries(localFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    router.push(`/perfumes?${params.toString()}`);
    setIsOpen(false);
  }

  function handleClear() {
    router.push("/perfumes");
    setIsOpen(false);
  }

  function handleCheckboxChange(key: string, value: string) {
    setLocalFilters((prev) => {
      const current = prev[key as keyof typeof prev] ?? "";
      const values = current.split(",").filter(Boolean);
      const newValues = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      return { ...prev, [key]: newValues.join(",") || undefined };
    });
  }

  function isChecked(key: string, value: string): boolean {
    const current = localFilters[key as keyof typeof localFilters] ?? "";
    return current.split(",").includes(value);
  }

  const categories = getCategories();
  const hasActiveFilters = Object.values(localFilters).some(Boolean);

  return (
    <>
      {/* Botão mobile para abrir filtros */}
      <button
        type="button"
        className="lg:hidden w-full mb-6 rounded-xl border border-ink/15 bg-white p-4 text-left transition hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="filter-sidebar"
      >
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18a1 1 0 011-1h6a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="font-medium text-ink">Filtros</span>
          {hasActiveFilters && (
            <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-ink/10 text-ink rounded-full">
              {Object.values(localFilters).filter(Boolean).length}
            </span>
          )}
        </div>
      </button>

      {/* Sidebar desktop + mobile drawer */}
      <aside
        id="filter-sidebar"
        className={`fixed inset-0 z-50 lg:static lg:z-auto transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
        style={{ width: "100%", maxWidth: "320px" }}
        aria-label="Filtros de perfumes"
      >
        {/* Overlay mobile */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          className={`relative bg-white lg:border lg:border-ink/10 lg:rounded-xl lg:p-6 ${
            isOpen ? "w-full max-w-sm" : "lg:w-full"
          }`}
          role="complementary"
          aria-label="Filtros de perfumes"
        >
          {/* Header mobile */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-ink/10">
            <h2 className="font-display text-lg font-semibold text-ink">Filtros</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-smoke hover:text-ink transition focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 rounded"
              aria-label="Fechar filtros"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 lg:p-0 space-y-6">
            {/* Busca */}
            <div>
              <label htmlFor="search" className="sr-only">
                Pesquisar
              </label>
              <input
                id="search"
                name="q"
                type="search"
                value={localFilters.q ?? ""}
                onChange={(e) => handleChange("q", e.target.value)}
                placeholder="Pesquisar perfume ou marca..."
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-smoke/60 focus:border-focus focus:ring-2 focus:ring-focus/20 focus:outline-none"
              />
            </div>

            {/* Categoria */}
            <div>
              <h3 className="mb-3 text-small font-medium text-ink">Categoria</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition cursor-pointer ${
                      isChecked("category", cat)
                        ? "bg-ink text-paper"
                        : "bg-white border border-ink/15 text-ink hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      checked={isChecked("category", cat)}
                      onChange={() => handleCheckboxChange("category", cat)}
                      className="sr-only"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Marca */}
            <div>
              <h3 className="mb-3 text-small font-medium text-ink">Marca</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition cursor-pointer ${
                      isChecked("brand", brand)
                        ? "bg-ink text-paper"
                        : "bg-white border border-ink/15 text-ink hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={brand}
                      checked={isChecked("brand", brand)}
                      onChange={() => handleCheckboxChange("brand", brand)}
                      className="sr-only"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Ano */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="yearFrom" className="mb-1.5 block text-small font-medium text-ink">
                  Ano mínimo
                </label>
                <input
                  id="yearFrom"
                  name="yearFrom"
                  type="number"
                  min="1700"
                  max={new Date().getFullYear()}
                  value={localFilters.yearFrom ?? ""}
                  onChange={(e) => handleChange("yearFrom", e.target.value)}
                  placeholder="Ex: 1990"
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-smoke/60 focus:border-ink focus:ring-2 focus:ring-focus/20 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="yearTo" className="mb-1.5 block text-small font-medium text-ink">
                  Ano máximo
                </label>
                <input
                  id="yearTo"
                  name="yearTo"
                  type="number"
                  min="1700"
                  max={new Date().getFullYear()}
                  value={localFilters.yearTo ?? ""}
                  onChange={(e) => handleChange("yearTo", e.target.value)}
                  placeholder="Ex: 2020"
                  className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink placeholder:text-smoke/60 focus:border-ink focus:ring-2 focus:ring-focus/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Avaliação mínima */}
            <div>
              <h3 className="mb-3 text-small font-medium text-ink">Avaliação mínima</h3>
              <div className="flex flex-wrap gap-2">
                {[3, 3.5, 4, 4.5].map((rating) => (
                  <label
                    key={rating}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition cursor-pointer ${
                      localFilters.minRating === String(rating)
                        ? "bg-ink text-paper"
                        : "bg-white border border-ink/15 text-ink hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="minRating"
                      value={String(rating)}
                      checked={localFilters.minRating === String(rating)}
                      onChange={() => handleChange("minRating", String(rating))}
                      className="sr-only"
                    />
                    <span className="flex items-center gap-1 text-yellow-500">★</span>
                    {rating}+
                  </label>
                ))}
              </div>
            </div>

            {/* Ordenação */}
            <div>
              <label htmlFor="sort" className="mb-1.5 block text-small font-medium text-ink">
                Ordenar por
              </label>
              <select
                id="sort"
                name="sort"
                value={localFilters.sort ?? "name"}
                onChange={(e) => handleChange("sort", e.target.value)}
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-ink focus:border-focus focus:ring-2 focus:ring-focus/20 focus:outline-none"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="rating">Melhor avaliação</option>
                <option value="popular">Mais popular</option>
                <option value="newest">Mais recentes</option>
                <option value="oldest">Mais antigos</option>
              </select>
            </div>

            {/* Ações */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-ink/10">
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                Aplicar
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-1 btn-secondary"
                >
                  Limpar
                </button>
              )}
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}