import { notes } from "@/data/notes";
import { perfumeNotes } from "@/data/perfume-notes";
import type { PerfumeNotesGrouped } from "@/types/note";

// Devolve as notas de um perfume, separadas em topo, coração e base
export async function getNotesByPerfumeId(
  perfumeId: string,
): Promise<PerfumeNotesGrouped> {
  const grouped: PerfumeNotesGrouped = { top: [], heart: [], base: [] };

  const rows = perfumeNotes.filter((row) => row.perfumeId === perfumeId);

  for (const row of rows) {
    const note = notes.find((item) => item.id === row.noteId);
    if (note) {
      grouped[row.type].push(note);
    }
  }

  return grouped;
}