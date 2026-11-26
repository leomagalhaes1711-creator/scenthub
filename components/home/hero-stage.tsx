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
}[] = [
  { type: "top", label: "Topo", subtitle: "Primeiros 15 min" },
  { type: "heart", label: "Coração", subtitle: "2 a 4 h" },
  { type: "base", label: "Base", subtitle: "6 h +" },
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

  // Gradiente sutil: cor da imagem no topo → papel no fundo
  const backgroundGradient = `linear-gradient(180deg, ${baseColor} 0%, ${baseColor} 30%, #f7f7f5 100%)`;

  // Tem foto?
  const hasPhoto = Boolean(perfume.imageUrl);

  return (
    <section
      className="relative isolate overflow-hidden motion-reduce:transition-none transition-colors duration-700 ease-out"
      style={{ background: backgroundGradient, color: text, minHeight: "calc(100svh - 72px)" }}
      aria-roledescription="carousel"
      aria-label="Perfumes em destaque"
      role="region"
    >
      {/* Botão anterior - clicável */}
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-current/10 border border-current/20 text-current opacity-50 hover:opacity-100 hover:bg-current/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-current"
        aria-label="Perfume anterior"
        aria-hidden="false"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Botão próximo - clicável */}
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-current/10 border border-current/20 text-current opacity-50 hover:opacity-100 hover:bg-current/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-current"
        aria-label="Próximo perfume"
        aria-hidden="false"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Luz de fundo sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: LIGHT }}
      />

      {/* Conteúdo principal - layout horizontal no desktop */}
      <div className="container-page relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12 md:py-20">
        {/* LADO ESQUERDO: Info + Pirâmide */}
        <div
          key={`info-${perfume.id}`}
          className="flex-1 w-full max-w-xl order-2 md:order-1 animate-reveal"
          style={{ maxWidth: "560px" }}
        >
          {/* Marca + Ano */}
          <p className="text-small font-medium opacity-70 mb-2">
            {perfume.brand}
            {perfume.releaseYear ? ` · ${perfume.releaseYear}` : ""}
          </p>

          {/* Nome do perfume */}
          <h1 className="text-display-1 text-current mb-6 text-wrap-balance">
            {perfume.name}
          </h1>

          {/* PIRÂMIDE OLFATIVA - Cards laterais */}
          <div className="space-y-3" role="list" aria-label="Pirâmide olfativa">
            {TIERS.map((tier, tierIndex) => {
              const tierNotes = notes[tier.type];
              if (tierNotes.length === 0) return null;

              // Backgrounds mais escuros/saturados para contraste garantido
              const tierPct = [0.75, 0.85, 0.95][tierIndex];
              const bg = `color-mix(in srgb, ${perfume.liquidColor} ${Math.round(tierPct * 100)}%, #16181d)`;
              const textColor = "#ffffff"; // Sempre branco sobre fundo escuro
              const labelColor = "#ffffff"; // Branco puro para labels
              const subtitleColor = "rgba(255,255,255,0.85)"; // Branco semi-transparente

              return (
                <article
                  key={tier.type}
                  className="rounded-2xl overflow-hidden relative animate-reveal"
                  style={{ animationDelay: `${100 + tierIndex * 80}ms`, backgroundColor: bg, color: textColor }}
                  role="listitem"
                >
                  {/* Barra de acento lateral - cor do líquido puro */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-2"
                    style={{ backgroundColor: perfume.liquidColor }}
                    aria-hidden="true"
                  />

                  <div className="relative p-5 pl-10 flex flex-col gap-3">
                    {/* Header do tier */}
                    <div className="flex items-center gap-3">
                      <span
                        className="text-caption uppercase tracking-widest font-semibold"
                        style={{ color: "#ffffff" }}
                      >
                        {tier.label}
                      </span>
                      <span className="text-caption" style={{ color: "rgba(255,255,255,0.85)" }}>
                        {tier.subtitle}
                      </span>
                    </div>

                    {/* Notas como chips - fundo semi-transparente branco */}
                    <div className="flex flex-wrap gap-2" role="group" aria-label={`${tier.label}: ${tierNotes.length} notas`}>
                      {tierNotes.map((note) => {
                        const catColor = CATEGORY_COLORS[note.category];
                        return (
                          <span
                            key={note.id}
                            title={note.category}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-transform hover:scale-105 cursor-default"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.18)",
                              borderColor: "rgba(255,255,255,0.35)",
                              color: "#ffffff",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: catColor }}
                            />
                            <span style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
                              {note.name}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Indicador de navegação (apenas contador) */}
          <div className="mt-8 flex items-center justify-center gap-3 opacity-50" aria-hidden="true">
            <span className="text-caption tabular-nums" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* LADO DIREITO: Frasco (protagonista) - sem container fixo, fusão total com fundo */}
        <div
          key={`bottle-${perfume.id}`}
          className="flex-1 w-full max-w-md order-1 md:order-2 flex items-end justify-center animate-reveal animate-reveal-delay-1"
          style={{ minHeight: "50vh" }}
        >
          {hasPhoto ? (
            <div className="relative w-full max-w-xs mx-auto aspect-[4/5]" style={{ maxHeight: "520px" }}>
              {/* Gradiente de fade inferior na própria imagem - funde com o fundo da página */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${baseColor} 100%)`,
                  zIndex: 1,
                }}
                aria-hidden="true"
              />
              <Image
                src={perfume.imageUrl!}
                alt={`Frasco do perfume ${perfume.name}`}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                priority
                className={`object-cover transition-opacity duration-500 ease-out ${
                  perfume.imageBackground ? "" : "mix-blend-multiply"
                }`}
                style={{
                  maskImage: `
                    radial-gradient(
                      ellipse 80% 90% at 50% 70%,
                      black 0%,
                      black 40%,
                      transparent 100%
                    )
                  `,
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.12))",
                }}
              />
            </div>
          ) : (
            <div className="animate-fade-in" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))" }}>
              <PerfumeBottle
                color={perfume.liquidColor}
                variant={getBottleVariant(perfume.id)}
                className="w-full h-auto max-w-xs mx-auto"
              />
            </div>
          )}
        </div>
      </div>

      {/* Navegação por teclado */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Perfume {index + 1} de {total}: {perfume.name}
      </div>
    </section>
  );
}