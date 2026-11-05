import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Cliente para o servidor, ligado à sessão do utilizador (guardada em cookies).
// Vamos usá-lo a partir da Fase 4 (autenticação).
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado a partir de um Server Component, que não pode escrever
            // cookies. É seguro ignorar: o proxy (Fase 4) renova a sessão.
          }
        },
      },
    },
  );
}