import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { headers } = request;
  const origin = headers.get("origin") || "";

  const redirectURL = new URL("/login", origin).toString();

  const response = NextResponse.redirect(redirectURL);

  cookies().set("token", "", { path: "/", expires: new Date(0) });
  redirect(redirectURL);
}
