import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // Pre-launch password gate. Active only when SITE_PASSWORD is set (e.g. in
  // Vercel env). Anyone must enter the password (username can be anything) to
  // view the site. Remove the SITE_PASSWORD env var to make the site public.
  const sitePassword = process.env.SITE_PASSWORD;
  if (sitePassword) {
    const expected = `Basic ${btoa(`guest:${sitePassword}`)}`;
    if (request.headers.get("authorization") !== expected) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Straight2Guide (pre-launch)"' },
      });
    }
  }

  let response = NextResponse.next({ request });

  // Skip auth middleware when Supabase env vars are not yet configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — keeps the auth token alive on every request
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect guide dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard/guide") && !user) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Protect admin dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (!user) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    // Role check happens in the admin layout server component via supabaseAdmin
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and Next.js internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
