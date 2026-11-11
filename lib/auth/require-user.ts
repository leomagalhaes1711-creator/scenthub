import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Para usar nas páginas protegidas: devolve o utilizador com sessão,
// ou envia para o login se não houver.
export async function requireUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}