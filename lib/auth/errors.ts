import type { AuthError } from "@supabase/supabase-js";

// Traduz os erros do Supabase Auth (em inglês) para mensagens em português
export function translateAuthError(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
      return "Email ou palavra-passe incorretos.";
    case "email_not_confirmed":
      return "Confirma o teu email antes de iniciar sessão.";
    case "user_already_exists":
    case "email_exists":
      return "Já existe uma conta com este email.";
    case "weak_password":
      return "A palavra-passe é fraca. Use pelo menos 8 caracteres.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit":
      return "Muitas tentativas. Espere um pouco e tenta de novo.";
    case "signup_disabled":
      return "Os registos estão desativados neste momento.";
    default:
      return "Algo deu errado. Tenta novamente dentro de instantes.";
  }
}