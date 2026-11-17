import { CATEGORY_COLORS, mixHex, readableTextOn } from "@/lib/liquid";
import type { NoteType, PerfumeNotesGrouped } from "@/types/note";

const PAPER = "#f7f7f5";

// As três camadas, de cima para baixo: a cor vai ficando mais carregada
const TIERS: {
  type: NoteType;
  title: string;
  hint: string;
  amount: number;
}[] = [
  { type: "top", title: "Notas de topo", hint: "Os primeiros minutos", amount: 0.22 },
  { type: "heart", title: "Notas de coração", hint: "O carácter do perfume", amount: 0.5 },
  { type: "base", title: "Notas de base", hint: "O que fica na pele", amount: 0.85 },
];

type PerfumeNotesProps = {
  notes: PerfumeNotesGrouped;
  liquidColor: string;
};

export default function PerfumeNotes({ notes, liquidColor }: PerfumeNotesProps) {
  const visible = TIERS.filter((tier) => notes[tier.type].length > 0);

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 overflow-hidden rounded-md">
      {visible.map((tier) => {
        const background = mixHex(liquidColor, PAPER, tier.amount);
        const text = readableTextOn(background);

        return (
          <div
            key={tier.type}
            className="grid gap-4 px-6 py-8 md:grid-cols-[16rem_1fr] md:px-10"
            style={{ backgroundColor: background, color: text }}
          >
            <div>
              <h3 className="font-display text-xl font-medium">{tier.title}</h3>
              <p className="text-sm opacity-75">{tier.hint}</p>
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
              {notes[tier.type].map((note) => (
                <li
                  key={note.id}
                  title={note.category}
                  className="flex items-center gap-2"
                >
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
        );
      })}
    </div>
  );
}