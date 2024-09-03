import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(`${origin}/login`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],

};
