import { cacheLife } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import type { NoteCategory, NoteType, PerfumeNotesGrouped } from "@/types/note";

type PerfumeNoteQueryRow = {
  type: NoteType;
  notes: {
    id: string;
    name: string;
    category: string;
    image_url: string | null;
  } | null;
};

// Devolve as notas de um perfume, separadas em topo, coração e base
export async function getNotesByPerfumeId(
  perfumeId: string,
): Promise<PerfumeNotesGrouped> {
  "use cache";
  cacheLife("minutes");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("perfume_notes")
    .select("type, notes(id, name, category, image_url)")
    .eq("perfume_id", perfumeId)
    .order("id");

  if (error) {
    throw new Error(`Erro ao carregar notas: ${error.message}`);
  }

  const grouped: PerfumeNotesGrouped = { top: [], heart: [], base: [] };

  for (const row of data as unknown as PerfumeNoteQueryRow[]) {
    if (row.notes) {
      grouped[row.type].push({
        id: row.notes.id,
        name: row.notes.name,
        category: row.notes.category as NoteCategory,
        imageUrl: row.notes.image_url,
      });
    }
  }

  return grouped;
}