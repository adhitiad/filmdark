import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const authPath = "/api/auth/";
  const loginPath = "/api/auth/signin";
  const homePath = "/";
  const currenPath = request.nextUrl.pathname;

  if (
    !session &&
    !currenPath.startsWith(authPath) &&
    !currenPath.startsWith(homePath)
  ) {
    return NextResponse.redirect(new URL(loginPath, request.url));
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
