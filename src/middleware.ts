import NextAuth from "next-auth";
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig);

export async function middleware(req: { auth: any; nextUrl: { pathname: any; }; }) {
  const isLoggedIn = !!req.auth
  const route = req.nextUrl.pathname;
  // if (!session) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
