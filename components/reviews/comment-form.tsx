"use client";

import { useState, type FormEvent } from "react";
import { createComment, updateComment, deleteComment } from "@/lib/actions/comments";
import type { CommentWithUser } from "@/lib/queries/comments";

type CommentFormProps = {
  perfumeId: string;
  isLoggedIn: boolean;
  initialComment?: CommentWithUser; // se existir, é edição
};

export default function CommentForm({
  perfumeId,
  isLoggedIn,
  initialComment,
}: CommentFormProps) {
  const [content, setContent] = useState(initialComment?.content ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chars, setChars] = useState(content.length);

  const isEditing = Boolean(initialComment);

  if (!isLoggedIn) {
    return (
      <div className="border-t border-ink/10 pt-6">
        <p className="text-smoke">
          Entre na sua conta para avaliar este perfume, comentar e guardar
          favoritos.
        </p>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (trimmed.length < 1 || trimmed.length > 2000) {
      setError("O comentário deve ter entre 1 e 2000 caracteres.");
      return;
    }

    setLoading(true);

    const result = isEditing && initialComment
      ? await updateComment(initialComment.id, trimmed)
      : await createComment(perfumeId, trimmed);

    setLoading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    // Sucesso: limpa o formulário (para novo comentário) ou fecha edição
    setContent("");
    setChars(0);
  }

  async function handleDelete() {
    if (!initialComment) return;
    if (!window.confirm("Apagar este comentário?")) return;

    setLoading(true);
    const result = await deleteComment(initialComment.id);
    setLoading(false);

    if (!result.ok) {
      setError(result.message);
    }
    // Se ok, o parent vai recarregar via cache tag
  }

  return (
    <div className="border-t border-ink/10 pt-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => {
            const val = e.target.value;
            setContent(val);
            setChars(val.length);
          }}
          placeholder={isEditing ? "Editar comentário..." : "Escreva o seu comentário..."}
          rows={4}
          className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-smoke/60 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/20 resize-none"
          maxLength={2000}
          disabled={loading}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-smoke/70">{chars} / 2000</span>
          <div className="flex gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Apagar
              </button>
            )}
            <button
              type="submit"
              disabled={loading || content.trim().length === 0}
              className="rounded-full bg-ink px-6 py-2 text-sm font-medium text-paper transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (isEditing ? "A guardar..." : "A publicar...") : isEditing ? "Guardar" : "Publicar"}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}