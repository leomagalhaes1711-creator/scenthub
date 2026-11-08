import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthCard
      title="Criar conta"
      subtitle="Avalie perfumes, comente e guarde os teus favoritos."
      footer={
        <>
          Já possui conta?{" "}
          <Link
            href="/login"
            className="font-medium text-amber transition hover:text-amber-dark"
          >
            Entrar
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}