import type { PerfumeNotesGrouped } from "@/types/note";
import type { Perfume } from "@/types/perfume";

// Um perfume em destaque no hero, com as suas notas
export interface HeroItem {
  perfume: Perfume;
  notes: PerfumeNotesGrouped;
}