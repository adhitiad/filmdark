import { create } from "zustand";
import { z } from "zod";
import { Genre, GenreSchema } from "@/types/genre";
import { updateUserPreferences } from "@/utils/userPreferences";

interface GenreStore {
  genres: Genre[];
  genreClicks: Record<number, number>;
  fetchGenres: () => Promise<void>;
  incrementGenreClick: (genreId: number) => void;
}

export const useGenreStore = create<GenreStore>((set, get) => ({
  genres: [],
  genreClicks: {},
  fetchGenres: async () => {
    const response = await fetch("/api/genres");
    const data = await response.json();
    try {
      const validatedGenres = z.array(GenreSchema).parse(data);
      set({ genres: validatedGenres });
    } catch (error) {
      console.error("Error parsing genres:", error);
    }
  },
  incrementGenreClick: (genreId: number) => {
    set((state) => {
      const newClicks = { ...state.genreClicks };
      newClicks[genreId] = (newClicks[genreId] || 0) + 1;

      if (newClicks[genreId] === 5) {
        // User has clicked this genre 5 times
        console.log(`User is interested in genre ${genreId}`);
        // Here you can trigger an action, like updating user preferences
        updateUserPreferences("userId", genreId as any);
      }

      return { genreClicks: newClicks };
    });
  },
}));
