import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

import { extractTokenMiddleware } from "./lib/utils"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })

    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")

    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard")
    const isMeAdminPage = req.nextUrl.pathname.startsWith("/dashboard/me")
    const isMeRecentQuizAdminPage = req.nextUrl.pathname.startsWith(
      "/dashboard/me/recent-quiz"
    )
    const isMeAllCoursesAdminPage = req.nextUrl.pathname.startsWith(
      "/dashboard/me/course"
    )
    const isMeGroupedQuizAdminPage = req.nextUrl.pathname.startsWith(
      "/dashboard/me/averaged-quiz"
    )

    const isMemberAreaPage = req.nextUrl.pathname.startsWith("/member-area")

    const isMemberAreaCoursePageDetail = req.nextUrl.pathname.startsWith(
      "/member-area/course/:path*"
    )

    if (isAuthPage) {
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
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

    if (isMeAllCoursesAdminPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else {
          return NextResponse.redirect(new URL("/member-area/course", req.url))
        }
      }

    if (isMeGroupedQuizAdminPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else {
          return NextResponse.redirect(
            new URL("/member-area/me/averaged-quiz", req.url)
          )
        }
      }

    if (isMeRecentQuizAdminPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else {
          return NextResponse.redirect(
            new URL("/member-area/me/recent-quiz", req.url)
          )
        }
      }

    if (isMeAdminPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else {
          return NextResponse.redirect(new URL("/member-area/me", req.url))
        }
      }

    if (isDashboardPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)

        const adminRole = "Admin"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else {
          return NextResponse.redirect(new URL("/member-area", req.url))
        }
      }

    if (isMemberAreaPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)

        const adminRole = "Admin"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        } else {
          return null
        }
      }
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
  matcher: [
    "/dashboard/:path*",
    "/dashboard/me/:path*",
    "/login",
    "/member-area/:path*",
    "/intro/knowledge/:path*",
    "/intro/categories/:path*",
  ],
}
