import type { NoteCategory, NoteType, PerfumeNotesGrouped } from "@/types/note";

// Cor do círculo de cada categoria
const categoryDot: Record<NoteCategory, string> = {
  Cítrico: "bg-yellow-400",
  Especiado: "bg-red-700",
  Aromático: "bg-emerald-600",
  Floral: "bg-pink-400",
  Amadeirado: "bg-stone-500",
  Doce: "bg-rose-300",
  Âmbar: "bg-orange-400",
  Aquático: "bg-sky-400",
  Verde: "bg-green-500",
  Fumado: "bg-zinc-800",
};

// As três faixas da pirâmide, de cima para baixo
const tiers: {
  type: NoteType;
  title: string;
  hint: string;
  width: string;
  background: string;
}[] = [
  {
    type: "top",
    title: "Notas de topo",
    hint: "Os primeiros minutos",
    width: "max-w-md",
    background: "bg-amber/10",
  },
  {
    type: "heart",
    title: "Notas de coração",
    hint: "O carácter do perfume",
    width: "max-w-2xl",
    background: "bg-amber/20",
  },
  {
    type: "base",
    title: "Notas de base",
    hint: "O rasto que fica na pele",
    width: "max-w-4xl",
    background: "bg-amber/30",
  },
];

export default function PerfumeNotes({ notes }: { notes: PerfumeNotesGrouped }) {
  const hasNotes = tiers.some((tier) => notes[tier.type].length > 0);

  if (!hasNotes) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {tiers.map((tier) => {
        const tierNotes = notes[tier.type];

        if (tierNotes.length === 0) {
          return null;
        }

        return (
          <div
            key={tier.type}
            className={`w-full ${tier.width} rounded-3xl px-6 py-6 text-center ${tier.background}`}
          >
            <h3 className="font-serif text-2xl font-semibold text-ink">
              {tier.title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">
              {tier.hint}
            </p>

            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {tierNotes.map((note) => (
                <li
                  key={note.id}
                  title={note.category}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/80 px-3 py-1.5 text-sm text-ink"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${categoryDot[note.category]}`}
                    aria-hidden="true"
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