export type NoteType = "top" | "heart" | "base";

export type NoteCategory =
  | "Cítrico"
  | "Especiado"
  | "Aromático"
  | "Floral"
  | "Amadeirado"
  | "Doce"
  | "Âmbar"
  | "Aquático"
  | "Verde"
  | "Fumado";

export interface Note {
  id: string;
  name: string;
  category: NoteCategory;
  imageUrl: string | null;
}

// Uma linha da futura tabela perfume_notes
export interface PerfumeNoteRow {
  perfumeId: string;
  noteId: string;
  type: NoteType;
}

// As notas de um perfume, já separadas por nível
export type PerfumeNotesGrouped = Record<NoteType, Note[]>;