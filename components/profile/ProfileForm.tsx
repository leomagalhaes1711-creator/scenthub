"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import TextField from "@/components/ui/TextField";
import { USERNAME_PATTERN } from "@/lib/auth/validation";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = {
  userId: string;
  initialUsername: string;
};

export default function ProfileForm({
  userId,
  initialUsername,
}: ProfileFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [savedUsername, setSavedUsername] = useState(initialUsername);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const cleanUsername = username.trim();

    if (cleanUsername === savedUsername) {
      setNotice("Nenhuma alteração para salvar.");
      return;
    }

    if (!USERNAME_PATTERN.test(cleanUsername)) {
      setError("O usuário deve ter 3 a 20 caracteres: letras, números ou _.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ username: cleanUsername })
      .eq("id", userId)
      .select("username")
      .maybeSingle();

    setLoading(false);

    if (updateError) {
      setError(
        updateError.code === "23505"
          ? "Este usuário já está em uso. Escolha outro."
          : "Não foi possível salvar. Tente novamente.",
      );
      return;
    }

    if (!data) {
      setError("Não foi possível salvar. Tente novamente.");
      return;
    }

    setUsername(data.username);
    setSavedUsername(data.username);
    setNotice("Usuário atualizado!");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField
        id="profile-username"
        label="Usuário"
        autoComplete="username"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        hint="3 a 20 caracteres: letras, números ou _"
      />

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {notice && (
        <p
          role="status"
          className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-amber px-6 py-2.5 text-sm font-medium text-cream transition hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}