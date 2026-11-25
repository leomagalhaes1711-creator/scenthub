import Link from "next/link";
import type { User } from "@supabase/supabase-js";

type AuthLinksProps = {
  user: User | null;
  ready: boolean;
  mobile?: boolean;
  onNavigate: () => void;
  onLogout: () => void;
};

export default function AuthLinks({
  user,
  ready,
  mobile = false,
  onNavigate,
  onLogout,
}: AuthLinksProps) {
  // Enquanto não sabemos se há sessão, reserva o espaço para a barra não "saltar"
  if (!ready) {
    return mobile ? null : <span className="h-9 w-44" aria-hidden="true" />;
  }

  const linkClass = mobile
    ? "text-base font-medium text-ink"
    : "text-small font-medium text-ink underline underline-offset-4 hover:text-smoke transition-colors focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded px-1 -mx-1";

  if (user) {
    return (
      <>
        <Link
          href="/profile"
          onClick={onNavigate}
          className={linkClass}
        >
          Perfil
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className={mobile ? "btn-primary w-full" : "btn-secondary"}
        >
          Sair
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        onClick={onNavigate}
        className={mobile ? "btn-secondary w-full" : linkClass}
      >
        Entrar
      </Link>
      <Link
        href="/register"
        onClick={onNavigate}
        className={mobile ? "btn-primary w-full mt-2" : "btn-primary ml-2"}
      >
        Criar conta
      </Link>
    </>
  );
}