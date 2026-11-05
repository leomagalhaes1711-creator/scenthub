import type { NoteType, PerfumeNoteRow } from "@/types/note";

// Forma compacta de escrever: para cada perfume, as notas de cada nível.
const pyramids: Record<string, Record<NoteType, string[]>> = {
  "noite-de-ambar": {
    top: ["cardamomo", "bergamota"],
    heart: ["rosa", "incenso"],
    base: ["ambar", "baunilha", "sandalo"],
  },
  "brisa-atlantica": {
    top: ["limao", "sal-marinho"],
    heart: ["algas", "salva"],
    base: ["ambroxan", "cedro"],
  },
  "jardim-secreto": {
    top: ["bergamota"],
    heart: ["rosa", "peonia", "jasmim"],
    base: ["sandalo", "musgo"],
  },
  "madeira-negra": {
    top: ["pimenta", "cardamomo"],
    heart: ["geranio", "lavanda"],
    base: ["cedro", "vetiver", "ambroxan"],
  },
  "citrico-solar": {
    top: ["limao", "bergamota"],
    heart: ["lavanda", "salva"],
    base: ["cedro", "vetiver"],
  },
  "veludo-doce": {
    top: ["bergamota"],
    heart: ["jasmim", "caramelo"],
    base: ["baunilha", "sandalo"],
  },
  "folha-de-chuva": {
    top: ["folha-verde", "bergamota"],
    heart: ["geranio", "peonia"],
    base: ["musgo", "vetiver"],
  },
  "couro-e-fumo": {
    top: ["pimenta"],
    heart: ["incenso", "lavanda"],
    base: ["couro", "ambar", "cedro"],
  },
};

// Transformada em linhas, exatamente como será a tabela perfume_notes
export const perfumeNotes: PerfumeNoteRow[] = Object.entries(pyramids).flatMap(
  ([perfumeId, levels]) =>
    (Object.entries(levels) as [NoteType, string[]][]).flatMap(
      ([type, noteIds]) => noteIds.map((noteId) => ({ perfumeId, noteId, type })),
    ),
);