"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import RatingInput from "@/components/reviews/RatingInput";
import { ratePerfume } from "@/lib/actions/reviews";

type ReviewSectionProps = {
  perfumeId: string;
  isLoggedIn: boolean;
  initialRating: number;
};

type Feedback = { type: "success" | "error"; text: string };

export default function ReviewSection({
  perfumeId,
  isLoggedIn,
  initialRating,
}: ReviewSectionProps) {
  const [rating, setRating] = useState(initialRating);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <div className="rounded-3xl border border-ink/10 bg-white/70 p-8 text-center">
        <p className="text-muted">
          Entre na sua conta para avaliar este perfume, comentar e guardar
          favoritos.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href={`/login?next=${encodeURIComponent(`/perfumes/${perfumeId}`)}`}
            className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-amber-dark"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-amber px-6 py-2.5 text-sm font-medium text-amber transition hover:bg-amber/10"
          >
            Criar conta
          </Link>
        </div>
      </div>
    );
  }

  function handleChange(newRating: number) {
    const previous = rating;
    setRating(newRating);
    setFeedback(null);

    startTransition(async () => {
      const result = await ratePerfume(perfumeId, newRating);

      if (!result.ok) {
        setRating(previous);
        setFeedback({ type: "error", text: result.message });
        return;
      }

      setFeedback({
        type: "success",
        text: previous
          ? "Avaliação atualizada!"
          : "Obrigado pela sua avaliação!",
      });
    });
  }

  return (
    <div className="rounded-3xl border border-ink/10 bg-white/70 p-8 text-center">
      <p className="text-muted">
        {rating
          ? "Clique numa estrela para alterar a sua nota."
          : "Escolha de 1 a 5 estrelas."}
      </p>

      <div className="mt-4">
        <RatingInput
          value={rating}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      {feedback && (
        <p
          role={feedback.type === "error" ? "alert" : "status"}
          className={`mt-4 text-sm ${
            feedback.type === "error" ? "text-red-700" : "text-green-800"
          }`}
        >
          {feedback.text}
        </p>
      )}
    </div>
  );
}