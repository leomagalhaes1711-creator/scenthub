"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CommentResult =
  | { ok: true; comment?: CommentData }
  | { ok: false; message: string };

export interface CommentData {
  id: string;
  user_id: string;
  perfume_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  username: string;
}

async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
}

// Cria um comentário
export async function createComment(
  perfumeId: string,
  content: string,
): Promise<CommentResult> {
  const trimmed = content.trim();

  if (trimmed.length < 1 || trimmed.length > 2000) {
    return { ok: false, message: "O comentário deve ter entre 1 e 2000 caracteres." };
  }

  const { supabase, user } = await getUser();

  if (!user) {
    return { ok: false, message: "Entre na sua conta para comentar." };
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({ user_id: user.id, perfume_id: perfumeId, content: trimmed })
    .select("id, user_id, perfume_id, content, created_at, updated_at")
    .maybeSingle();

  if (error) {
    console.error("Erro ao criar comentário:", error);
    return { ok: false, message: "Não foi possível publicar o comentário. Tente novamente." };
  }

  updateTag("comments");

  // Busca o username para devolver completo
  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  return {
    ok: true,
    comment: {
      ...data!,
      username: profile?.username ?? "Usuário",
    },
  };
}

// Atualiza um comentário (só o dono)
export async function updateComment(
  commentId: string,
  content: string,
): Promise<CommentResult> {
  const trimmed = content.trim();

  if (trimmed.length < 1 || trimmed.length > 2000) {
    return { ok: false, message: "O comentário deve ter entre 1 e 2000 caracteres." };
  }

  const { supabase, user } = await getUser();

  if (!user) {
    return { ok: false, message: "Sessão expirada. Entre novamente." };
  }

  const { data, error } = await supabase
    .from("comments")
    .update({ content: trimmed })
    .eq("id", commentId)
    .eq("user_id", user.id)
    .select("id, user_id, perfume_id, content, created_at, updated_at")
    .maybeSingle();

  if (error) {
    console.error("Erro ao atualizar comentário:", error);
    return { ok: false, message: "Não foi possível atualizar. Tente novamente." };
  }

  if (!data) {
    return { ok: false, message: "Comentário não encontrado ou sem permissão." };
  }

  updateTag("comments");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  return {
    ok: true,
    comment: {
      ...data,
      username: profile?.username ?? "Usuário",
    },
  };
}

// Apaga um comentário (só o dono)
export async function deleteComment(commentId: string): Promise<CommentResult> {
  const { supabase, user } = await getUser();

  if (!user) {
    return { ok: false, message: "Sessão expirada. Entre novamente." };
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao apagar comentário:", error);
    return { ok: false, message: "Não foi possível apagar. Tente novamente." };
  }

  updateTag("comments");
  return { ok: true };
}