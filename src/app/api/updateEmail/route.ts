import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const doesUserExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!doesUserExist) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    const updateEmail = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        email: email,
      },
    });

    return NextResponse.json({ success: "Email changed" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
