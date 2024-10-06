import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://freetestapi.com/api/v1/movies?page=1&limit=12"
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
