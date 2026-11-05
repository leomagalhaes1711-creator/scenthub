"use client";

import Link from "next/link";
import { useState } from "react";
import BottleIcon from "@/components/perfume/BottleIcon";

const links = [
  { href: "/perfumes", label: "Perfumes" },
  { href: "/favorites", label: "Favoritos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <BottleIcon className="h-7 w-[22px]" />
          <span className="font-serif text-2xl font-semibold text-ink">
            ScentHub
          </span>
        </Link>

        {/* Menu para ecrãs grandes */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-amber"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-sm font-medium text-ink transition hover:text-amber"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-amber px-5 py-2 text-sm font-medium text-cream transition hover:bg-amber-dark"
          >
            Criar conta
          </Link>
        </div>

        {/* Botão do menu para telemóvel */}
        <button
          type="button"
          className="text-2xl text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Menu aberto no telemóvel */}
      {open && (
        <div className="flex flex-col gap-4 border-t border-ink/10 px-6 py-5 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-base font-medium text-ink"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="rounded-full bg-amber px-5 py-2.5 text-center text-sm font-medium text-cream"
          >
            Criar conta
          </Link>
        </div>
      )}
    </header>
  );
}