import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // if (
    //   req.nextUrl.pathname.startsWith("/login") &&
    //   req.nextauth.token?.email
    // ) {
    //   return NextResponse.rewrite(new URL("/", req.url))
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/dashboard/:path*"] }
