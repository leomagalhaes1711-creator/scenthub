import type { NoteCategory } from "@/types/note";

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  imageUrl: string | null; // null = usa o frasco desenhado
  imageBackground: string | null; // cor do fundo da imagem
  releaseYear: number | null;
  perfumer: string | null;
  description: string;
  ratingAverage: number;
  ratingCount: number;
  liquidCategory: NoteCategory | null;
  liquidColor: string;
}