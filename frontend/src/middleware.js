import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("ALL COOKIES:", request.cookies.getAll());
  const token = request.cookies.get("token")?.value;
  console.log("midle token",token)
  const protectedRoutes = ["/profile", "/orders", "/cart", "/wishlist"];
  const authRoutes = ["/login", "/register"];

  const { pathname } = request.nextUrl;

  // Protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Prevent login if already logged in
  if (authRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}