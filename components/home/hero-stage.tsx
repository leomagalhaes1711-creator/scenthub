"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import { getBottleVariant, readableTextOn, CATEGORY_COLORS } from "@/lib/liquid";
import type { HeroItem } from "@/types/hero";
import type { NoteType } from "@/types/note";

// Pirâmide com larguras proporcionais à duração real
const TIERS: {
  type: NoteType;
  label: string;
  subtitle: string;
  portion: number;
}[] = [
  { type: "top", label: "Topo", subtitle: "Primeiros 15 min", portion: 0.15 },
  { type: "heart", label: "Coração", subtitle: "2 a 4 h", portion: 0.35 },
  { type: "base", label: "Base", subtitle: "6 h +", portion: 0.50 },
];

// Luz difusa sutil
const LIGHT =
  "radial-gradient(60% 70% at 72% 28%, rgba(255,255,255,0.25), rgba(255,255,255,0) 70%)";

export default function HeroStage({ items }: { items: HeroItem[] }) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const [mounted, setMounted] = useState(false);

  const go = useCallback(
    (step: number) => {
      setIndex((current) => (current + step + total) % total);
    },
    [total],
  );

  // Navegação por teclado
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  // Evita flash de layout no SSR
  useEffect(() => setMounted(true), []);

  if (total === 0 || !mounted) {
    return null;
  }

  const { perfume, notes } = items[index];

  // Cor base: cor do fundo da foto se houver, senão cor do líquido
  const baseColor = (perfume.imageUrl && perfume.imageBackground) || perfume.liquidColor;
  const text = readableTextOn(baseColor);

  // Gradiente: da cor base no topo → papel (#f7f7f5) no fundo
  const backgroundGradient = `linear-gradient(180deg, ${baseColor} 0%, ${baseColor} 35%, #f7f7f5 100%)`;

  // Tem foto?
  const hasPhoto = Boolean(perfume.imageUrl);

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-72px)] flex-col overflow-hidden motion-reduce:transition-none"
      style={{ background: backgroundGradient, color: text }}
    >
      {/* Luz de fundo sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: LIGHT }}
      />

      {/* Conteúdo central vertical */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:px-12">
        {/* GARRAFA — protagonista (foto ou SVG) */}
        <div
          key={`bottle-${perfume.id}`}
          className="relative w-full max-w-xs mx-auto mb-10 bottle-entrance"
          style={{ height: "45vh", maxHeight: "420px" }}
        >
          {hasPhoto ? (
            <Image
              src={perfume.imageUrl!}
              alt={`Frasco do perfume ${perfume.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className={`object-contain [mask-image:radial-gradient(closest-side,black_72%,transparent)] transition-opacity duration-300 ease-out ${
                perfume.imageBackground ? "" : "mix-blend-multiply"
              }`}
            />
          ) : (
            <PerfumeBottle
              color={perfume.liquidColor}
              variant={getBottleVariant(perfume.id)}
              className="w-full h-full bottle-fade"
            />
          )}
        </div>

        {/* NOME + MARCA — legíveis, secundários */}
        <div key={`info-${perfume.id}`} className="text-center w-full max-w-md mb-8 info-entrance">
          <p className="text-sm opacity-70 mb-1">
            {perfume.brand}
            {perfume.releaseYear ? ` · ${perfume.releaseYear}` : ""}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-wrap-balance">
            {perfume.name}
          </h1>
        </div>

        {/* PIRÂMIDE OLFATIVA — larguras proporcionais */}
        <div className="w-full max-w-md mx-auto space-y-3 pyramid-container">
          {TIERS.map((tier) => {
            const tierNotes = notes[tier.type];
            if (tierNotes.length === 0) return null;

            // Porcentagens mais altas para melhor contraste: 40% / 60% / 80%
            const tierPct = [0.40, 0.60, 0.80][TIERS.indexOf(tier)];
            const bg = `color-mix(in srgb, ${perfume.liquidColor} ${Math.round(tierPct * 100)}%, #f7f7f5)`;
            const textColor = readableTextOn(bg);

            return (
              <div
                key={tier.type}
                className="pyramid-tier rounded-xl overflow-hidden ring-1 ring-black/5"
                style={{ backgroundColor: bg, color: textColor }}
              >
                {/* Barra lateral indicando proporção */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-40"
                  style={{ backgroundColor: perfume.liquidColor }}
                />

                <div className="relative flex flex-col items-center gap-3 px-4 py-5 pl-5">
                  <div className="text-center w-full">
                    <p className="text-xs font-medium opacity-90 uppercase tracking-wide">
                      {tier.label}
                    </p>
                    <p className="text-xs opacity-70">{tier.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 w-full">
                    {tierNotes.map((note) => {
                      const catColor = CATEGORY_COLORS[note.category];
                      return (
                        <span
                          key={note.id}
                          title={note.category}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-transform hover:scale-105"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${catColor} 22%, transparent)`,
                            borderColor: `color-mix(in srgb, ${catColor} 45%, transparent)`,
                            color: catColor,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          }}
                        >
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: catColor }}
                          />
                          {note.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicador sutil + navegação por teclado */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs opacity-50 transition-opacity duration-300 pointer-events-none">
        <kbd className="px-2 py-1 rounded bg-current/10 border border-current/20">←</kbd>
        <span className="tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <kbd className="px-2 py-1 rounded bg-current/10 border border-current/20">→</kbd>
      </div>
    </section>
  );
}