import { z } from "zod";

export const RatingSchema = z.object({
  id: z.number(),
  userId: z.string(),
  movieId: z.number(),
  rating: z.number().min(1).max(5),
});

export type Rating = z.infer<typeof RatingSchema>;
