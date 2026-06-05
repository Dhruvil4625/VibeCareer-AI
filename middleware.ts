import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// NOTE: In Next.js 16+, the "middleware" file is renamed to "proxy.ts"
// This file provides route protection for all dashboard pages.
// To suppress the deprecation warning, rename this file to proxy.ts after upgrading.

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/sign-in",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/resume/:path*",
    "/cover-letter/:path*",
    "/jobs/:path*",
    "/tracker/:path*",
    "/coach/:path*",
    "/interview/:path*",
    "/profile-optimizer/:path*",
    "/settings/:path*",
  ],
};
