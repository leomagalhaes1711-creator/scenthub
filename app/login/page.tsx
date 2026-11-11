import { Suspense } from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Entrar"
      subtitle="Bem-vindo de volta ao ScentHub."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link
            href="/register"
            className="font-medium text-amber transition hover:text-amber-dark"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}