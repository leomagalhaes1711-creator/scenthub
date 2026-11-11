import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Páginas que exigem sessão iniciada
const PROTECTED_PATHS = ["/profile", "/favorites"];

// Páginas que não fazem sentido para quem já tem sessão
const AUTH_PATHS = ["/login", "/register"];

function matches(pathname: string, paths: string[]) {
  return paths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

// Cria um redirecionamento sem perder os cookies de sessão renovados
function redirectTo(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
  next?: string,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  if (next) {
    url.searchParams.set("next", next);
  }

  const redirect = NextResponse.redirect(url);

  response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));

  // Respostas personalizadas nunca devem ficar em cache
  redirect.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, max-age=0, must-revalidate",
  );

  return redirect;
}

// Corre antes de cada pedido: renova a sessão e protege as páginas.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers?: Record<string, string>) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );

          // Impede que respostas com cookies de sessão fiquem em cache
          Object.entries(headers ?? {}).forEach(([key, value]) =>
            response.headers.set(key, value),
          );
        },
      },
    },
  );

  // Valida e, se necessário, renova a sessão.
  // Não coloques código entre a criação do cliente e esta linha.
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = Boolean(data?.claims);
  const { pathname } = request.nextUrl;

  if (!isLoggedIn && matches(pathname, PROTECTED_PATHS)) {
    return redirectTo(request, response, "/login", pathname);
  }

  if (isLoggedIn && matches(pathname, AUTH_PATHS)) {
    return redirectTo(request, response, "/");
  }

  return response;
}

export const config = {
  matcher: [
    // Todas as rotas, exceto ficheiros estáticos e imagens
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};