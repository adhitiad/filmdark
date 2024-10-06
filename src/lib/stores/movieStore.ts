import { create } from "zustand";
import { z } from "zod";
import { Movie, MovieSchema } from "@/types/movie";

interface MovieStore {
  movies: Movie[];
  fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  fetchMovies: async () => {
    const response = await fetch("/api/movies");
    const data = await response.json();

    try {
      const validatedMovies = z.array(MovieSchema).parse(data.movies); // Sesuaikan sesuai struktur data
      set({ movies: validatedMovies });
    } catch (error) {
      console.error("Error parsing movies data:", error);
    }
  },
}));
