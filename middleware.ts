import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

import SupervisorAreaPage from "./app/(dashboard-supervisor)/supervisor-area/page"
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

    const isCourseDetailAdminPage =
      req.nextUrl.pathname.startsWith("/dashboard/course/")

    const isMemberAreaPage = req.nextUrl.pathname.startsWith("/member-area")

    const isMemberAreaCoursePageDetail = req.nextUrl.pathname.startsWith(
      "/member-area/course/:path*"
    )

    const isSupervisorAreaPage =
      req.nextUrl.pathname.startsWith("/supervisor-area")

    if (isAuthPage) {
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
        const superVisorRole = "Supervisor"
        const pemateriRole = "Pemateri"
        const normalRole = "User"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        } else if (
          userRoles &&
          userRoles.some((role) => role.role_name === normalRole)
        ) {
          return NextResponse.redirect(new URL("/member-area", req.url))
        } else if (
          userRoles &&
          userRoles.some((role) => role.role_name === superVisorRole)
        ) {
          return NextResponse.redirect(new URL("/supervisor-area", req.url))
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

    if (isCourseDetailAdminPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)
        const adminRole = "Admin"
        const superVisorRole = "Supervisor"
        const normalRole = "User"
        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else {
          // get course id from url
          const courseId = req.nextUrl.pathname.split("/")[3]

          return NextResponse.redirect(
            new URL(`/member-area/course/${courseId}`, req.url)
          )
        }
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
        const superVisorRole = "Supervisor"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return null
        } else if (
          userRoles &&
          userRoles.some((role) => role.role_name === superVisorRole)
        ) {
          return NextResponse.redirect(new URL("/supervisor-area", req.url))
        } else {
          return NextResponse.redirect(new URL("/member-area", req.url))
        }
      }

    if (isSupervisorAreaPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)

        const adminRole = "Admin"
        const normalRole = "User"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        } else if (
          userRoles &&
          userRoles.some((role) => role.role_name === normalRole)
        ) {
          return NextResponse.redirect(new URL("/member-area", req.url))
        } else {
          return null
        }
      }

    if (isMemberAreaPage)
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)

        const adminRole = "Admin"
        const superVisorRole = "Supervisor"

        const userRoles = extractToken.role

        if (
          userRoles &&
          userRoles.some((role) => role.role_name === adminRole)
        ) {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        } else if (
          userRoles &&
          userRoles.some((role) => role.role_name === superVisorRole)
        ) {
          return NextResponse.redirect(new URL("/supervisor-area", req.url))
        }
        {
          return null
        }
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
    "/login",
    "/member-area/:path*",
    "/supervisor-area/:path*",
    "/intro/knowledge/:path*",
    "/intro/categories/:path*",
  ],
}
