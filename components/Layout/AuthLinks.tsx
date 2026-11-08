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
    : "text-sm font-medium text-ink transition hover:text-amber";

  const buttonClass = mobile
    ? "rounded-full bg-amber px-5 py-2.5 text-center text-sm font-medium text-cream"
    : "rounded-full bg-amber px-5 py-2 text-sm font-medium text-cream transition hover:bg-amber-dark";

  if (user) {
    return (
      <>
        <Link href="/profile" onClick={onNavigate} className={linkClass}>
          Perfil
        </Link>
        <button type="button" onClick={onLogout} className={buttonClass}>
          Sair
        </button>
      </>
    );
  }

  return (
    <>
      <Link href="/login" onClick={onNavigate} className={linkClass}>
        Entrar
      </Link>
      <Link href="/register" onClick={onNavigate} className={buttonClass}>
        Criar conta
      </Link>
    </>
  );
}