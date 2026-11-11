"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import TextField from "@/components/ui/TextField";
import { translateAuthError } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";
import { USERNAME_PATTERN } from "@/lib/auth/validation";


export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    const cleanUsername = username.trim();

    if (!USERNAME_PATTERN.test(cleanUsername)) {
      setError("O username deve ter 3 a 20 caracteres: letras, números ou _.");
      return;
    }

    if (password.length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    // Verifica se o username já está em uso
    const { data: existing, error: lookupError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", cleanUsername)
      .maybeSingle();

    if (lookupError) {
      setError("Não foi possível verificar o username. Tente novamente.");
      setLoading(false);
      return;
    }

    if (existing) {
      setError("Este username já está em uso. Escolha outro.");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { username: cleanUsername },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (signUpError) {
      setError(translateAuthError(signUpError));
      setLoading(false);
      return;
    }

    // Com a confirmação de email ligada, ainda não há sessão
    if (!data.session) {
      setNotice(
        "Conta criada! Enviámos um email para confirmares o teu endereço.",
      );
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

   return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField
        id="username"
        label="Usuário"
        autoComplete="username"
        required
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Usuário"
        hint="3 a 20 caracteres: letras, números ou _"
      />
      <TextField
        id="email"
        label="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="email"
      />
      <TextField
        id="password"
        label="Senha"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Senha"
        hint="Pelo menos 8 caracteres"
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
        className="w-full rounded-full bg-amber px-6 py-3 text-sm font-medium text-cream transition hover:bg-amber-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Criando conta..." : "Criar conta"}
      </button>
    </form>
  );
}