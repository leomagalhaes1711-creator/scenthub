export interface Perfume {
  id: string;
  name: string;
  brand: string;
  imageUrl: string | null; // null = usa o frasco provisório
  releaseYear: number | null;
  perfumer: string | null;
  description: string;
  ratingAverage: number;
  ratingCount: number;
}