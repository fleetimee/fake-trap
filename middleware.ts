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

        const userRoles = extractToken.role

        console.log(userRoles.length)

        // if userRoles contains more than 1 role
        if (userRoles.length > 1) {
          return NextResponse.redirect(new URL("/panel-selector", req.url))
        } else {
          // if userRoles contains only 1 role
          const isRoleAdmin = userRoles.some((role) => role.id_role === 1)
          const isRoleMember = userRoles.some((role) => role.id_role === 2)
          const isRoleSupervisor = userRoles.some((role) => role.id_role === 3)
          const isRolePemateri = userRoles.some((role) => role.id_role === 4)

          if (isRoleAdmin) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
          }

          if (isRoleMember) {
            return NextResponse.redirect(new URL("/member-area", req.url))
          }

          if (isRoleSupervisor) {
            return NextResponse.redirect(new URL("/supervisor-area", req.url))
          }

          if (isRolePemateri) {
            return NextResponse.redirect(new URL("/pemateri-area", req.url))
          }
        }
      }
      return null
    }

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      if (!isAuth) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      const isRoleAdmin = userRoles.some((role) => role.id_role === 1)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/", req.url))
      }
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
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/me/:path*",
    "/dashboard/course/:path*/forum/:path*",
    "/login",
    "/member-area/:path*",
    "/supervisor-area/:path*",
    "/pemateri-area/:path*",
    "/intro/knowledge/:path*",
    "/intro/categories/:path*",
  ],
}
