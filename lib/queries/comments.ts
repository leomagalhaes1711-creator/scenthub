import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";

export interface CommentWithUser {
  id: string;
  user_id: string;
  perfume_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  username: string;
}

type CommentRow = {
  id: string;
  user_id: string;
  perfume_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  profiles: { username: string | null } | null;
};

export async function getCommentsByPerfumeId(
  perfumeId: string,
): Promise<CommentWithUser[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("comments");

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("comments")
    .select("id, user_id, perfume_id, content, created_at, updated_at, profiles(username)")
    .eq("perfume_id", perfumeId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Erro ao carregar comentários: ${error.message}`);
  }

  return (data as unknown as CommentRow[]).map((row) => ({
    id: row.id,
    user_id: row.user_id,
    perfume_id: row.perfume_id,
    content: row.content,
    created_at: row.created_at,
    updated_at: row.updated_at,
    username: row.profiles?.username ?? "Usuário",
  }));
}