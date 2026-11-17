"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PerfumeBottle from "@/components/perfume/perfume-bottle";
import { getBottleVariant, readableTextOn } from "@/lib/liquid";
import type { HeroItem } from "@/types/hero";
import type { NoteType } from "@/types/note";

// As três linhas da pirâmide, de cima para baixo
const TIERS: { type: NoteType; label: string; width: string }[] = [
  { type: "top", label: "Topo", width: "w-[48%]" },
  { type: "heart", label: "Coração", width: "w-[74%]" },
  { type: "base", label: "Base", width: "w-full" },
];

// Luz difusa e grão fino por cima do campo de cor
const LIGHT =
  "radial-gradient(60% 70% at 72% 28%, rgba(255,255,255,0.30), rgba(255,255,255,0) 70%)";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export default function HeroStage({ items }: { items: HeroItem[] }) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const go = useCallback(
    (step: number) => {
      setIndex((current) => (current + step + total) % total);
    },
    [total],
  );

  // Setas do teclado (ignora quando se está a escrever num campo)
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

  if (total === 0) {
    return null;
  }

  const { perfume, notes } = items[index];

  // O campo de cor: a cor do fundo da foto, ou a do líquido
  const field =
    (perfume.imageUrl && perfume.imageBackground) || perfume.liquidColor;
  const text = readableTextOn(field);

  // O nome encolhe quando é comprido, para caber numa só linha
  const nameLength = Math.max(perfume.name.length, 6);
  const nameSize = `clamp(1.75rem, min(18vw, ${(148 / nameLength).toFixed(2)}vw), 14rem)`;

  const buttonClass =
    "flex h-10 w-10 items-center justify-center rounded-full border border-current/40 text-xl transition hover:bg-current/10 motion-reduce:transition-none";

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-73px)] flex-col overflow-hidden transition-colors duration-700 motion-reduce:transition-none"
      style={{ backgroundColor: field, color: text }}
    >
      {/* Luz e grão */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: LIGHT }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      {/* Nome gigante, decorativo */}
      <p
        key={`name-${perfume.id}`}
        aria-hidden="true"
        className="stage-in select-none whitespace-nowrap px-6 pt-6 font-display font-semibold uppercase leading-none tracking-tight md:px-12"
        style={{ fontSize: nameSize, opacity: 0.22 }}
      >
        {perfume.name}
      </p>

      <h1 className="sr-only">{perfume.name}</h1>

      {/* Palco */}
      <div className="grid flex-1 items-center gap-8 px-6 py-8 md:grid-cols-2 md:px-12">
        <div key={`info-${perfume.id}`} className="stage-in order-2 md:order-1">
          <p className="text-sm opacity-80">
            {perfume.brand}
            {perfume.releaseYear ? `, ${perfume.releaseYear}` : ""}
          </p>

          <div className="mt-6 w-full max-w-md space-y-4">
            {TIERS.map((tier) => {
              const names = notes[tier.type].map((note) => note.name);

              if (names.length === 0) {
                return null;
              }

              return (
                <div
                  key={tier.type}
                  className={`mx-auto border-t border-current/40 pt-2 text-center ${tier.width}`}
                >
                  <p className="text-xs opacity-70">{tier.label}</p>
                  <p className="mt-0.5 text-sm font-medium">
                    {names.join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          key={`bottle-${perfume.id}`}
          className="stage-in relative order-1 mx-auto h-[40svh] w-full max-w-sm md:order-2 md:h-[56svh]"
        >
          {perfume.imageUrl ? (
            <Image
              src={perfume.imageUrl}
              alt={`Frasco do perfume ${perfume.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className={`object-contain [mask-image:radial-gradient(closest-side,black_72%,transparent)] ${
                perfume.imageBackground ? "" : "mix-blend-multiply"
              }`}
            />
          ) : (
            <PerfumeBottle
              color={perfume.liquidColor}
              variant={getBottleVariant(perfume.id)}
              className="mx-auto h-full"
            />
          )}
        </div>
      </div>

      {/* Controlos */}
      <div className="flex flex-col gap-6 px-6 pb-8 md:flex-row md:items-end md:justify-between md:px-12">
        <Link
          href={`/perfumes/${perfume.id}`}
          className="w-fit text-lg font-medium underline underline-offset-4"
        >
          Ver {perfume.name}
        </Link>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Perfume anterior"
            onClick={() => go(-1)}
            className={buttonClass}
          >
            ‹
          </button>
          <span aria-live="polite" className="text-sm tabular-nums">
            {pad(index + 1)} de {pad(total)}
          </span>
          <button
            type="button"
            aria-label="Próximo perfume"
            onClick={() => go(1)}
            className={buttonClass}
          >
            ›
          </button>
        </div>

        <form action="/perfumes" role="search" className="w-full md:max-w-xs">
          <label htmlFor="hero-search" className="sr-only">
            Pesquisar perfumes
          </label>
          <input
            id="hero-search"
            name="q"
            type="search"
            placeholder="Pesquisar perfumes"
            className="w-full border-b border-current/50 bg-transparent py-2 text-sm placeholder:text-current/60 focus:border-current focus:outline-none"
          />
        </form>
      </div>
    </section>
  );
}