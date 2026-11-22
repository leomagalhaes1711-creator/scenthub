"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type FavoriteResult =
  | { ok: true; isFavorite: boolean }
  | { ok: false; message: string };

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

// Alterna favorito (adiciona se não existe, remove se existe)
export async function toggleFavorite(
  perfumeId: string,
): Promise<FavoriteResult> {
  const { supabase, user } = await getUser();

  if (!user) {
    return { ok: false, message: "Entre na sua conta para guardar favoritos." };
  }

  // Verifica se já é favorito
  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("perfume_id", perfumeId)
    .maybeSingle();

  if (existing) {
    // Remove
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("perfume_id", perfumeId);

    if (error) {
      console.error("Erro ao remover favorito:", error);
      return { ok: false, message: "Não foi possível remover dos favoritos." };
    }

    updateTag("favorites");
    return { ok: true, isFavorite: false };
  } else {
    // Adiciona
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: user.id, perfume_id: perfumeId });

    if (error) {
      console.error("Erro ao adicionar favorito:", error);
      return { ok: false, message: "Não foi possível adicionar aos favoritos." };
    }

    updateTag("favorites");
    return { ok: true, isFavorite: true };
  }
}

// Verifica se um perfume é favorito do usuário atual
export async function checkFavorite(
  perfumeId: string,
): Promise<{ isFavorite: boolean }> {
  const { supabase, user } = await getUser();

  if (!user) {
    return { isFavorite: false };
  }

  const { data } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("perfume_id", perfumeId)
    .maybeSingle();

  return { isFavorite: Boolean(data) };
}