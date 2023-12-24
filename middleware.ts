import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/preview",
    "/about",
    "/contact",
    "/feature",
    "/price",
  ],

  beforeAuth() {},

  afterAuth(auth, req) {
    // console.log(req.url);
    // console.log(req.nextUrl);
    //Nếu như đã đăng nhập thì cần chuyển luôn vào trang của organization, và nếu người dùng chưa chọn organization thì cần redirect về trang chọn organization
    if (auth.userId && auth.isPublicRoute) {
      if (!req.nextUrl.pathname.startsWith("/about")) {
        let path = "/select-org";

        if (auth.orgId) {
          path = `/organization/${auth.orgId}`;
        }

        const orgSelection = new URL(path, req.url);

        return NextResponse.redirect(orgSelection);
      }
    }

    //Nếu người dùng chưa đăng nhập mà truy cập vào url cần đăng nhập thì redirect sang trang đăng nhập
    if (!auth.userId && !auth.isPublicRoute && !req.url.includes("/preview")) {
      // console.log(111);

      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc|preview)(.*)"],
};
