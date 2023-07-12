import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

import { extractTokenMiddleware } from "./lib/utils"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")

    if (isAuthPage) {
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)

        const adminRole = "Admin"
        const userRole = "User"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        } else {
          return NextResponse.redirect(new URL("/member-area", req.url))
        }
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    // const requiredRole = "Admin"
    // const userRoles = extractToken.role
    // if (
    //   !userRoles ||
    //   !userRoles.some((role) => role.role_name === requiredRole)
    // ) {
    //   // Check if the user has the role "user"
    //   if (userRoles && userRoles.some((role) => role.role_name === "User")) {
    //     return NextResponse.redirect(new URL("/member-area", req.url))
    //   }

    //   return new Response("Unauthorized", { status: 401 })
    // }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/member-area/:path*"],
}
