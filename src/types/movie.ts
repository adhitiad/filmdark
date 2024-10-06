import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  posterPath: z.string(),
  genreId: z.number(),
});

export type Movie = z.infer<typeof MovieSchema>;
