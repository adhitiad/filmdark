import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const authPath = "/api/auth/";
  const loginPath = "/login/";
  const registerPath = "/register/";
  const homePath = "/";
  const currenPath = request.nextUrl.pathname;

  if (
    !session &&
    !currenPath.startsWith(authPath) &&
    !currenPath.startsWith(homePath) &&
    !currenPath.startsWith(loginPath) &&
    !currenPath.startsWith(registerPath)
  ) {
    return NextResponse.redirect(
      new URL(`/${loginPath}?callbackUrl=${currenPath}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/api/auth/:path*",
    "/api/:path*",
    "/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
