import { CATEGORY_COLORS } from "@/lib/liquid";
import type { NoteType, PerfumeNotesGrouped } from "@/types/note";

const INK = "#16181d";

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
      {visible.map((tier, tierIndex) => {
        // Backgrounds escuros/saturados para contraste garantido
        const tierPct = [0.75, 0.85, 0.95][tierIndex];
        const bg = `color-mix(in srgb, ${liquidColor} ${Math.round(tierPct * 100)}%, #16181d)`;
        const textColor = "#ffffff";
        const subtitleColor = "rgba(255,255,255,0.85)";

        return (
          <div
            key={tier.type}
            className="relative"
            style={{ backgroundColor: bg, color: textColor }}
          >
            {/* Barra lateral indicando proporção - cor do líquido puro */}
            <div
              className="absolute left-0 top-0 bottom-0 w-2"
              style={{ backgroundColor: liquidColor }}
              aria-hidden="true"
            />

            <div className="relative grid gap-4 px-6 py-8 md:grid-cols-[16rem_1fr] md:px-10 pl-4">
              <div className="pt-2">
                <h3 className="font-display text-xl font-medium" style={{ color: "#ffffff" }}>
                  {tier.title}
                </h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {tier.subtitle}
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
                {notes[tier.type].map((note) => (
                  <li key={note.id} title={note.category} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-3 w-3 rounded-full ring-1 ring-white/20"
                      style={{ backgroundColor: CATEGORY_COLORS[note.category] }}
                    />
                    <span style={{ color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                      {note.name}
                    </span>
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