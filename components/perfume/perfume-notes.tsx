import { CATEGORY_COLORS, mixHex, readableTextOn } from "@/lib/liquid";
import type { NoteType, PerfumeNotesGrouped } from "@/types/note";

const PAPER = "#f7f7f5";

// Pirâmide com larguras proporcionais à duração real da evaporação
const TIERS: {
  type: NoteType;
  title: string;
  subtitle: string;
  portion: number;
}[] = [
  { type: "top", title: "Notas de topo", subtitle: "Primeiros 15 min", portion: 0.15 },
  { type: "heart", title: "Notas de coração", subtitle: "Coração · 2 a 4 h", portion: 0.35 },
  { type: "base", title: "Notas de base", subtitle: "Fixa · 6 h +", portion: 0.50 },
];

type PerfumeNotesProps = {
  notes: PerfumeNotesGrouped;
  liquidColor: string;
};

export default function PerfumeNotes({ notes, liquidColor }: PerfumeNotesProps) {
  const visible = TIERS.filter((tier) => notes[tier.type].length > 0);

  if (visible.length === 0) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-xl">
      {visible.map((tier) => {
        const bg = mixHex(liquidColor, PAPER, tier.portion);
        const textColor = readableTextOn(bg);

        return (
          <div
            key={tier.type}
            className="relative"
            style={{ backgroundColor: bg, color: textColor }}
          >
            {/* Barra lateral indicando proporção */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 opacity-30"
              style={{ backgroundColor: liquidColor }}
            />

            <div className="relative grid gap-4 px-6 py-8 md:grid-cols-[16rem_1fr] md:px-10 pl-4">
              <div className="pt-2">
                <h3 className="font-display text-xl font-medium">{tier.title}</h3>
                <p className="text-sm opacity-75">{tier.subtitle}</p>
              </div>

              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
                {notes[tier.type].map((note) => (
                  <li key={note.id} title={note.category} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full ring-1 ring-black/20"
                      style={{ backgroundColor: CATEGORY_COLORS[note.category] }}
                    />
                    {note.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}