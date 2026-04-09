import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  console.log("Middleware - Token:", token);
  console.log("Middleware - role:", role);

  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/profile", "/orders", "/cart", "/wishlist"];
  const authRoutes = ["/login", "/register"];

  // 🔒 Protected routes
  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 🔒 Admin route
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  // 🔥 LOGIN/REGISTER PAGE REDIRECT
  if (authRoutes.some((r) => pathname.startsWith(r))) {
    if (token) {
      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      } else {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/orders",
    "/cart",
    "/wishlist",
    "/login",
    "/register",
    "/admin/:path*",
  ],
};