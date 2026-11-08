"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import AuthLinks from "@/components/layout/AuthLinks";
import BottleIcon from "@/components/perfume/BottleIcon";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/perfumes", label: "Perfumes" },
  { href: "/favorites", label: "Favoritos" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  // Acompanha o estado da sessão (entrar, sair, sessão renovada)
  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

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
          <AuthLinks
            user={user}
            ready={authReady}
            onNavigate={() => setOpen(false)}
            onLogout={handleLogout}
          />
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
          <AuthLinks
            mobile
            user={user}
            ready={authReady}
            onNavigate={() => setOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      )}
    </header>
  );
}