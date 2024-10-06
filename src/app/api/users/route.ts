import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest | any, res: NextResponse) {
  const session = await auth(req);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { movieId, watchTime, action } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    switch (action) {
      case "watch":
        await prisma.watchHistory.upsert({
          where: {
            userId_movieId: {
              userId: user.id,
              movieId: movieId,
            },
          },
          update: {
            watchTime: watchTime,
          },
          create: {
            userId: user.id,
            movieId: movieId,
            watchTime: watchTime,
          },
        });
        break;

      case "like":
        await prisma.userLike.upsert({
          where: {
            userId_movieId: {
              userId: user.id,
              movieId: movieId,
            },
          },
          update: {},
          create: {
            userId: user.id,
            movieId: movieId,
          },
        });
        break;

      case "rate":
        const { rating } = await req.json();
        await prisma.rating.upsert({
          where: {
            userId_movieId: {
              userId: user.id,
              movieId: movieId,
            },
          },
          update: {
            value: rating,
          },
          create: {
            userId: user.id,
            movieId: movieId,
            value: rating,
          },
        });
        break;

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User behavior recorded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in recording user behavior:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
