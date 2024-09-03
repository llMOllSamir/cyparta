import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const credentials: { email: string; password: string } =
      await request.json();

    if (!credentials.email || !credentials.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://cyparta-backend-gf7qm.ondigitalocean.app/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { message: errorData.message || "Login failed" },
        { status: res.status }
      );
    }
    const data: ResponseLoginData = await res.json();
    cookies().set({
      name: "token",
      value: data.access,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({ message: "Login successful", data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export type ResponseLoginData = { refresh: string; access: string };
