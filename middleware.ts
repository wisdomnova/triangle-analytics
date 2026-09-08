import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/overview",
    "/visitors",
    "/events",
    "/domains",
    "/profile",
    "/dashboard",
    "/auth/claim-onboarding",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const authRoutes = ["/auth/signin", "/auth/join"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // If trying to access a protected route without an auth token, redirect to signin
  if (isProtectedRoute && !token) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If already authenticated and accessing login/join pages, redirect to overview
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/overview/:path*",
    "/visitors/:path*",
    "/events/:path*",
    "/domains/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
