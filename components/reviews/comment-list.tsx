import { Suspense } from "react";
import { getCommentsByPerfumeId } from "@/lib/queries/comments";
import CommentItem from "@/components/reviews/comment-item";
import CommentForm from "@/components/reviews/comment-form";
import type { CommentWithUser } from "@/lib/queries/comments";

interface CommentListProps {
  perfumeId: string;
  currentUserId: string | null;
}

async function CommentListContent({ perfumeId, currentUserId }: CommentListProps) {
  const comments = await getCommentsByPerfumeId(perfumeId);
  const isLoggedIn = Boolean(currentUserId);

  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Comentários
        <span className="ml-2 text-lg font-normal text-smoke">({comments.length})</span>
      </h2>

      {comments.length > 0 ? (
        <div className="mt-8 space-y-6">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              perfumeId={perfumeId}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-smoke">Ainda não há comentários. Seja o primeiro a comentar.</p>
      )}

      {/* Formulário para novo comentário */}
      <CommentForm perfumeId={perfumeId} isLoggedIn={isLoggedIn} />
    </section>
  );
}

export default function CommentList({ perfumeId, currentUserId }: CommentListProps) {
  return (
    <Suspense
      fallback={<p className="mt-16 text-center text-smoke">A carregar comentários...</p>}
    >
      <CommentListContent perfumeId={perfumeId} currentUserId={currentUserId} />
    </Suspense>
  );
}