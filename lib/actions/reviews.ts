"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type RatePerfumeResult =
  | { ok: true }
  | { ok: false; message: string };

export async function ratePerfume(
  perfumeId: string,
  rating: number,
): Promise<RatePerfumeResult> {
  // Valida sempre no servidor: o que vem do browser nunca é de confiança
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, message: "A avaliação deve ser de 1 a 5 estrelas." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, message: "Entre na sua conta para avaliar." };
  }

  const { error } = await supabase.rpc("rate_perfume", {
    p_perfume_id: perfumeId,
    p_rating: rating,
  });

  if (error) {
    console.error("Erro em rate_perfume:", error);
    return {
      ok: false,
      message: "Não foi possível salvar a avaliação. Tente novamente.",
    };
  }

  // Atualiza já a média e o total nas páginas
  updateTag("perfumes");

  return { ok: true };
}