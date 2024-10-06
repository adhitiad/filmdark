import { z } from "zod";

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Genre = z.infer<typeof GenreSchema>;
