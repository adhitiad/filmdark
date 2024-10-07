import prisma from "@/lib/prisma";
import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const hashedPasswords = await createHash(
      "sha256",
      password
    ).digest("hex");

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: hashedPasswords,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}

export async function GET(req:NextRequest){
  try {
    const response = await fetch(
      "https://freetestapi.com/api/v1/movies?page=1&limit=12"
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the movies" },
      { status: 500 }
    );
  }
}
