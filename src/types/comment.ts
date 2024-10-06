import { z } from "zod";

export const CommentSchema = z.object({
  id: z.number(),
  userId: z.string(),
  movieId: z.number(),
  content: z.string(),
  createdAt: z.date(),
});

export type Comment = z.infer<typeof CommentSchema>;
