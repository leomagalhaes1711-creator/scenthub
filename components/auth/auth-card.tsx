import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: AuthCardProps) {
  return (
    <main className="mx-auto flex max-w-6xl justify-center px-6 py-16 md:py-24">
      <div className="w-full max-w-md rounded-3xl border border-ink/10 bg-white/70 p-8 shadow-sm md:p-10">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">{title}</h1>
        <p className="mt-2 text-smoke">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-smoke">{footer}</p>
      </div>
    </main>
  );
}