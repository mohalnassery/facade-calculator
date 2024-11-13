import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isAuth = !!token;
      const isAuthPage = req.nextUrl.pathname.startsWith("/auth");

      if (isAuthPage) {
        return !isAuth;
      }

      return isAuth;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/projects/:path*",
    "/auth/:path*",
  ],
};