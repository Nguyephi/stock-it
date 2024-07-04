/**
 * Public routes.
 * No auth needed
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * Auth routes used for auth.
 * Redirects to logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/signin",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]

/**
 * Prefix for api auth routes.
 * Routes with this prefix are used for auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Default redirect path after user logs in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"