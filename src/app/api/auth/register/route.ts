import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const doesEmailExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (doesEmailExist) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const createAccount = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    if (!createAccount) {
      return NextResponse.json(
        { error: "Error creating account" },
        { status: 400 }
      );
    } else if (createAccount) {
      return NextResponse.json({ success: "Account created" }, { status: 200 });
    }

    return NextResponse.json({ success: "Account created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
