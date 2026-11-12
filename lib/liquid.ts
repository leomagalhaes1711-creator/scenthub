import type { NoteCategory, NoteType } from "@/types/note";

// Uma cor por categoria de nota
export const CATEGORY_COLORS: Record<NoteCategory, string> = {
  Cítrico: "#f2c230",
  Especiado: "#9c3d27",
  Aromático: "#6f8f72",
  Floral: "#e36a8d",
  Amadeirado: "#8c5a3c",
  Doce: "#c98a5a",
  Âmbar: "#e08a1e",
  Aquático: "#3fa7c9",
  Verde: "#4e9f5b",
  Fumado: "#3a3a40",
};

// Cor para perfumes sem notas
const FALLBACK_COLOR = "#b9bcc2";

// Em caso de empate, ganha a categoria que vem primeiro nesta lista
const TIE_PRIORITY: NoteCategory[] = [
  "Especiado",
  "Âmbar",
  "Amadeirado",
  "Doce",
  "Fumado",
  "Floral",
  "Aquático",
  "Verde",
  "Aromático",
  "Cítrico",
];

// O que se cheira primeiro pesa mais
const TIER_WEIGHT: Record<NoteType, number> = {
  top: 3,
  heart: 2,
  base: 2,
};

export type LiquidEntry = { type: NoteType; category: string };

export type Liquid = { category: NoteCategory | null; color: string };

function isNoteCategory(value: string): value is NoteCategory {
  return value in CATEGORY_COLORS;
}

// Escolhe a categoria dominante e devolve a sua cor
export function getLiquid(entries: LiquidEntry[]): Liquid {
  const scores = new Map<NoteCategory, { score: number; count: number }>();

  for (const { type, category } of entries) {
    if (!isNoteCategory(category)) continue;

    const current = scores.get(category) ?? { score: 0, count: 0 };
    scores.set(category, {
      score: current.score + TIER_WEIGHT[type],
      count: current.count + 1,
    });
  }

  let best: NoteCategory | null = null;

  for (const category of TIE_PRIORITY) {
    const candidate = scores.get(category);
    if (!candidate) continue;

    const current = best ? scores.get(best) : undefined;

    if (
      !current ||
      candidate.score > current.score ||
      (candidate.score === current.score && candidate.count > current.count)
    ) {
      best = category;
    }
  }

  return best
    ? { category: best, color: CATEGORY_COLORS[best] }
    : { category: null, color: FALLBACK_COLOR };
}

// --- Cor do texto com contraste suficiente ---

const INK = "#16181d";
const WHITE = "#ffffff";

function channel(value: number): number {
  const scaled = value / 255;
  return scaled <= 0.03928
    ? scaled / 12.92
    : Math.pow((scaled + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

const INK_LUMINANCE = luminance(INK);

// Devolve tinta escura ou branco, conforme o que for mais legível sobre o fundo
export function readableTextOn(background: string): string {
  const bg = luminance(background);
  const contrastWithInk = (bg + 0.05) / (INK_LUMINANCE + 0.05);
  const contrastWithWhite = 1.05 / (bg + 0.05);
  return contrastWithInk >= contrastWithWhite ? INK : WHITE;
}

// Mistura a cor com o papel, para obter um fundo suave
export function getTint(color: string, amount = 26): string {
  return `color-mix(in srgb, ${color} ${amount}%, #f7f7f5)`;
}

// Escolhe sempre a mesma silhueta de frasco para o mesmo perfume
export function getBottleVariant(id: string): 0 | 1 | 2 {
  let sum = 0;
  for (const char of id) {
    sum += char.charCodeAt(0);
  }
  return (sum % 3) as 0 | 1 | 2;
}