"use client";

import { useGenreStore } from "@/lib/stores/genreStore";
import { useEffect } from "react";

export default function GenreList() {
    const { genres, fetchGenres, incrementGenreClick } = useGenreStore();

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => incrementGenreClick(genre.id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}
