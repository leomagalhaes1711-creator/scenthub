import { createClient } from "@supabase/supabase-js";

// Cliente para ler dados públicos (o catálogo).
// Não usa cookies nem sessão: é igual para todos os visitantes.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}