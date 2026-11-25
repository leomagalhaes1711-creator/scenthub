"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState<number>(() => {
    // Lazy initializer - só executa no client
    if (typeof window !== "undefined") {
      return new Date().getFullYear();
    }
    return 2026; // fallback para SSR
  });

  // Garante que o ano é atualizado no client-side
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-ink/10 bg-paper/50" role="contentinfo">
      <div className="container-page py-12 md:py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold text-ink">
              ScentHub
            </p>
            <p className="mt-2 text-small text-smoke">
              Projeto de estudo, sem fins comerciais. As marcas e os nomes dos
              perfumes pertencem aos seus respectivos donos.
            </p>
          </div>

          <nav className="flex flex-col gap-3 md:flex-row md:gap-6 md:items-center" aria-label="Navegação do rodapé">
            <Link
              href="/perfumes"
              className="text-small text-smoke hover:text-ink underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded px-1 -mx-1"
            >
              Perfumes
            </Link>
            <Link
              href="/favorites"
              className="text-small text-smoke hover:text-ink underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded px-1 -mx-1"
            >
              Favoritos
            </Link>
            <Link
              href="/login"
              className="text-small text-smoke hover:text-ink underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded px-1 -mx-1"
            >
              Entrar
            </Link>
          </nav>

          <p className="text-caption text-smoke/60 text-center md:text-right">
            © {year} ScentHub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}