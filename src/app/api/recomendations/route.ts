import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest | any, res: NextResponse) {
  const movieId = req.query.movieId as string;
  const session = await auth();

  try {
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: { tags: true },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    let recommendations;

    if (session && session.user) {
      // For logged-in users, use watch history and tags
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          watchHistory: { include: { movie: { include: { tags: true } } } },
        },
      });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const watchedTags = user.watchHistory
        .flatMap((wh: any) => wh.movie.tags)
        .map((tag: any) => tag.id);

      recommendations = await prisma.movie.findMany({
        where: {
          AND: [
            { id: { not: movieId } },
            {
              OR: [
                { tags: { some: { id: { in: watchedTags } } } },
                {
                  tags: {
                    some: { id: { in: movie.tags.map((tag: any) => tag.id) } },
                  },
                },
              ],
            },
          ],
        },
        take: 5,
        orderBy: { createdAt: "desc" },
      });
    } else {
      // For non-logged-in users, use only tags of the current movie
      recommendations = await prisma.movie.findMany({
        where: {
          AND: [
            { id: { not: movieId } },
            {
              tags: {
                some: { id: { in: movie.tags.map((tag: any) => tag.id) } },
              },
            },
          ],
        },
        take: 5,
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(recommendations, { status: 200 });
  } catch (error) {
    console.error("Error in movie recommendations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
