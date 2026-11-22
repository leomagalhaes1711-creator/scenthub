"use client";

import { useState, useEffect } from "react";
import { toggleFavorite, checkFavorite } from "@/lib/actions/favorites";

type FavoriteButtonProps = {
  perfumeId: string;
  isLoggedIn: boolean;
  className?: string;
};

export default function FavoriteButton({
  perfumeId,
  isLoggedIn,
  className = "",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  // Verifica estado inicial no client
  useEffect(() => {
    if (!isLoggedIn) {
      setChecked(true);
      return;
    }
    checkFavorite(perfumeId).then(({ isFavorite: fav }) => {
      setIsFavorite(fav);
      setChecked(true);
    });
  }, [perfumeId, isLoggedIn]);

  async function handleClick() {
    if (!isLoggedIn) return;
    if (loading) return;

    setLoading(true);
    const result = await toggleFavorite(perfumeId);
    setLoading(false);

    if (result.ok) {
      setIsFavorite(result.isFavorite);
    } else {
      alert(result.message);
    }
  }

  if (!checked) {
    return (
      <button
        type="button"
        disabled
        className={`p-2 rounded-full transition ${className}`}
        aria-label="A verificar favorito..."
      >
        <svg className="h-5 w-5 text-ink/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || !isLoggedIn}
      className={`p-2 rounded-full transition ${className} ${
        isFavorite
          ? "text-red-500 hover:bg-red-50"
          : "text-ink/40 hover:text-red-500 hover:bg-red-50"
      } disabled:cursor-not-allowed disabled:opacity-50`}
      aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      aria-pressed={isFavorite}
    >
      <svg
        className="h-5 w-5"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}