import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: false,
  });

  if (req.nextUrl.pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/csr") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/ssr") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/data-fetching/*") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/csr", "/ssr", "/data-fetching/:path*"],
};
