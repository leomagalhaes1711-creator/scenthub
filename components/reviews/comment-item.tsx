"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { deleteComment } from "@/lib/actions/comments";
import type { CommentWithUser } from "@/lib/queries/comments";
import CommentForm from "@/components/reviews/comment-form";

type CommentItemProps = {
  comment: CommentWithUser;
  currentUserId: string | null;
  perfumeId: string;
};

export default function CommentItem({ comment, currentUserId, perfumeId }: CommentItemProps) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isOwner = currentUserId === comment.user_id;

  const date = new Date(comment.created_at);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
  const updated = comment.updated_at !== comment.created_at;

  async function handleDelete() {
    if (!window.confirm("Apagar este comentário?")) return;
    setDeleting(true);
    const result = await deleteComment(comment.id);
    setDeleting(false);
    if (!result.ok) {
      alert(result.message);
    }
    // Cache tag "comments" invalida e recarrega a lista
  }

  return (
    <article className="border-t border-ink/10 pt-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/10 text-ink font-medium text-sm">
          {comment.username.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <strong className="text-ink">{comment.username}</strong>
            <time className="text-xs text-smoke" dateTime={comment.created_at}>
              {timeAgo}
            </time>
            {updated && (
              <span className="text-xs text-smoke/60">(editado)</span>
            )}
          </div>

          <p className="mt-1 text-ink whitespace-pre-wrap">{comment.content}</p>

          {isOwner && (
            <div className="mt-3 flex items-center gap-3">
              {!editing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="text-sm font-medium text-smoke underline underline-offset-2 hover:text-ink"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-sm font-medium text-red-600 underline underline-offset-2 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deleting ? "A apagar..." : "Apagar"}
                  </button>
                </>
              ) : (
                <CommentForm
                  perfumeId={perfumeId}
                  isLoggedIn={true}
                  initialComment={comment}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}