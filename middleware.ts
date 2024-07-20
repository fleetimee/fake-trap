import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

import { extractTokenMiddleware } from "./lib/utils"

// export function middleware(request: NextRequest) {
//   const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
//   const cspHeader = `
//     default-src 'self';
//     script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
//     style-src 'self' 'nonce-${nonce}';
//     img-src 'self' blob: data:;
//     font-src 'self';
//     object-src 'none';
//     base-uri 'self';
//     form-action 'self';
//     frame-ancestors 'none';
//     upgrade-insecure-requests;
// `
//   // Replace newline characters and spaces
//   const contentSecurityPolicyHeaderValue = cspHeader
//     .replace(/\s{2,}/g, " ")
//     .trim()

//   const requestHeaders = new Headers(request.headers)
//   requestHeaders.set("x-nonce", nonce)

//   requestHeaders.set(
//     "Content-Security-Policy",
//     contentSecurityPolicyHeaderValue
//   )

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   })
//   response.headers.set(
//     "Content-Security-Policy",
//     contentSecurityPolicyHeaderValue
//   )

//   return response
// }

/**
 * Middleware function that handles authentication and authorization for different user roles.
 * @param req - The request object.
 * @returns A NextResponse object or null.
 */
export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token

    const isAuthPage = req.nextUrl.pathname.startsWith("/login")

    // If user attempts to access login page
    if (isAuthPage) {
      // While user is authenticated
      if (isAuth) {
        const extractToken = extractTokenMiddleware(token?.token)

        const userRoles = extractToken.role

        // if userRoles contains more than 1 role
        // redirect to panel selector page
        if (userRoles.length > 1) {
          return NextResponse.redirect(new URL("/panel-selector", req.url))
        } else {
          // if userRoles contains only 1 role
          // redirect to the respective panel
          const isRolePemateriDivisi = userRoles.some(
            (role) => role.id_role === 1
          )
          const isRoleSpvPemateriDivisi = userRoles.some(
            (role) => role.id_role === 2
          )
          const isRoleOperatorLMS = userRoles.some((role) => role.id_role === 3)

          const isRoleSpvOperatorLMS = userRoles.some(
            (role) => role.id_role === 4
          )

          const isRolePeserta = userRoles.some((role) => role.id_role === 5)

          const isRoleExecutive = userRoles.some((role) => role.id_role === 6)

          if (isRolePemateriDivisi) {
            return NextResponse.redirect(new URL("/pemateri-divisi", req.url))
          }

          if (isRoleSpvPemateriDivisi) {
            return NextResponse.redirect(
              new URL("/supervisor-pemateri-divisi", req.url)
            )
          }

          if (isRoleOperatorLMS) {
            return NextResponse.redirect(new URL("/operator-lms", req.url))
          }

          if (isRoleSpvOperatorLMS) {
            return NextResponse.redirect(new URL("/supervisor-lms", req.url))
          }

          if (isRolePeserta) {
            return NextResponse.redirect(new URL("/peserta", req.url))
          }

          if (isRoleExecutive) {
            return NextResponse.redirect(new URL("/executive", req.url))
          }
        }
      }
      return null
    }

    // Check if user is authenticated
    // if user is not authenticated, redirect to login page
    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    // Protect Panel Selector Route
    // If user has less than 2 roles, redirect to 404
    if (req.nextUrl.pathname.startsWith("/panel-selector")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      if (userRoles.length < 2) {
        return NextResponse.redirect(new URL("/404", req.url))
      }
    }

    // Protect Pemateri Divisi Route
    // if user is not Pemateri Divisi, redirect to 404
    if (req.nextUrl.pathname.startsWith("/pemateri-divisi")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      const isRoleAdmin = userRoles.some((role) => role.id_role === 1)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/404", req.url))
      }
    }

    // Protect Supervisor Pemateri Divisi Route
    // if user is not Supervisor Pemateri Divisi, redirect to 404
    if (req.nextUrl.pathname.startsWith("/supervisor-pemateri-divisi")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      const isRoleAdmin = userRoles.some((role) => role.id_role === 2)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/404", req.url))
      }
    }

    // Protect Operator LMS Route
    // if user is not Operator LMS, redirect to 404
    if (req.nextUrl.pathname.startsWith("/operator-lms")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      const isRoleAdmin = userRoles.some((role) => role.id_role === 3)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/404", req.url))
      }
    }

    // Protect Supervisor LMS Route
    // if user is not Supervisor LMS, redirect to 404
    if (req.nextUrl.pathname.startsWith("/supervisor-lms")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      const isRoleAdmin = userRoles.some((role) => role.id_role === 4)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/404", req.url))
      }
    }

    // Protect Peserta Route
    // if user is not Peserta, redirect to 404
    if (req.nextUrl.pathname.startsWith("/peserta")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      const isRoleAdmin = userRoles.some((role) => role.id_role === 5)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/404", req.url))
      }
    }

    // Protect Executive Route
    // if user is not Executive, redirect to 404
    if (req.nextUrl.pathname.startsWith("/executive")) {
      const extractToken = extractTokenMiddleware(token?.token)

      const userRoles = extractToken.role

      const isRoleAdmin = userRoles.some((role) => role.id_role === 6)

      if (!isRoleAdmin) {
        return NextResponse.redirect(new URL("/404", req.url))
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
    "/dashboard/course/:path*/forum/:path*",
    "/login",
    "/member-area/:path*",
    "/supervisor-area/:path*",
    "/pemateri-area/:path*",
    "/intro/knowledge/:path*",
    "/intro/categories/:path*",
    "/panel-selector/:path*",
    "/pemateri-divisi/:path*",
    "/supervisor-pemateri-divisi/:path*",
    "/operator-lms/:path*",
    "/supervisor-lms/:path*",
    "/peserta/:path*",
    "/executive/:path*",
    "/administrator/:path*",
  ],
}
