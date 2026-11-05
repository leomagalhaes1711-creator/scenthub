import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-sand/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold text-ink">
            ScentHub
          </p>
          <p className="mt-1 text-sm text-muted">
            Descubra, explore e partilhe o mundo dos perfumes.
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-muted">
          <Link href="/perfumes" className="transition hover:text-amber">
            Perfumes
          </Link>
          <Link href="/favorites" className="transition hover:text-amber">
            Favoritos
          </Link>
          <Link href="/login" className="transition hover:text-amber">
            Entrar
          </Link>
        </nav>
      </div>

      <div className="border-t border-ink/10 px-6 py-4 text-center text-xs text-muted">
        © 2026 ScentHub. Projeto de portefólio. Todas as marcas e perfumes
        apresentados são fictícios.
      </div>
    </footer>
  );
}