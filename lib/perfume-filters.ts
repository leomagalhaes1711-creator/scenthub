import type { NoteCategory } from "@/types/note";

// Filtros disponíveis para a listagem
export interface PerfumeFilters {
  q?: string;
  category?: NoteCategory;
  brand?: string;
  yearFrom?: number;
  yearTo?: number;
  minRating?: number;
  sort?: "name" | "rating" | "popular" | "newest" | "oldest";
}

// Categorias disponíveis (para o filtro) - função pura, sem cache
export function getCategories(): NoteCategory[] {
  return [
    "Cítrico",
    "Especiado",
    "Aromático",
    "Floral",
    "Amadeirado",
    "Doce",
    "Âmbar",
    "Aquático",
    "Verde",
    "Fumado",
  ];
}

// Tira acentos e maiúsculas: "Âmbar" passa a "ambar"
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}