import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const userToken = cookies().get("token")?.value;

    const response = await fetch(
      "https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
