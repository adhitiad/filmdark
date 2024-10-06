import { db } from "@/lib/drizzle/db";
import { userPreferences } from "@/lib/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function updateUserPreferences(userId: string, genreId: number) {
  try {
    const existingPreference = await db
      .select()
      .from(userPreferences)
      .where(
        and(
          eq(userPreferences.userId, userId),
          eq(userPreferences.genreId, genreId)
        )
      )
      .get();

    if (existingPreference) {
      await db
        .update(userPreferences)
        .set({ interestLevel: existingPreference.interestLevel + 1 })
        .where(eq(userPreferences.id, existingPreference.id))
        .run();
    } else {
      await db
        .insert(userPreferences)
        .values({
          userId,
          genreId,
          interestLevel: 1,
        })
        .run();
    }

    console.log(
      `Updated user preference for user ${userId} and genre ${genreId}`
    );
  } catch (error) {
    console.error("Error updating user preferences:", error);
  }
}
