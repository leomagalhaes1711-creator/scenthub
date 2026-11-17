import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-semibold text-ink">
            ScentHub
          </p>
          <p className="mt-2 text-sm text-smoke">
            Projeto de estudo, sem fins comerciais. As marcas e os nomes dos
            perfumes pertencem aos seus respectivos donos.
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-smoke">
          <Link
            href="/perfumes"
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            Perfumes
          </Link>
          <Link
            href="/favorites"
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            Favoritos
          </Link>
          <Link
            href="/login"
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </footer>
  );
}