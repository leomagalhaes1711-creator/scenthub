"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import AuthLinks from "@/components/site-layout/auth-links";
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

  // Fechar menu mobile ao navegar
  const handleLinkClick = () => {
    if (open) setOpen(false);
  };

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-sm" role="banner">
      <nav className="flex h-[72px] items-center justify-between px-6 md:px-12" aria-label="Navegação principal">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-2xl font-semibold tracking-tight text-ink focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-md px-2 -mx-2"
          aria-label="ScentHub - Página inicial"
        >
          ScentHub
        </Link>

        {/* Menu para ecrãs grandes */}
        <div className="hidden items-center gap-6 md:flex" role="navigation" aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-small font-medium text-ink underline underline-offset-4 hover:text-smoke transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-md px-1 -mx-1"
            >
              {link.label}
            </Link>
          ))}
          <AuthLinks
            user={user}
            ready={authReady}
            onNavigate={handleLinkClick}
            onLogout={handleLogout}
          />
        </div>

        {/* Botão do menu para telemóvel */}
        <button
          type="button"
          className="btn-icon md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Menu aberto no telemóvel */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden animate-fade-in border-t border-ink/10 px-6 py-5"
          role="navigation"
          aria-label="Menu móvel"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-base font-medium text-ink py-2 hover:text-smoke transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-md px-2 -mx-2"
            >
              {link.label}
            </Link>
          ))}
          <AuthLinks
            mobile
            user={user}
            ready={authReady}
            onNavigate={handleLinkClick}
            onLogout={handleLogout}
          />
        </div>
      )}
    </header>
  );
}