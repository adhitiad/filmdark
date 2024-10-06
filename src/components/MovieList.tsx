"use client";

import { useState, useEffect } from "react";
import { useMovieStore } from "@/lib/stores/movieStore";
import MovieCard from "./MovieCard";
import React from "react";


export default function MovieList() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            const response = await fetch("/api/movies");
            const data = await response.json();
            setMovies(data);
            setLoading(false);
        };
        fetchMovie();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie: any) => (
                <>
                    {/* Loading Skeleton */}
                    {loading && (
                        <div className="w-full h-64 bg-gray-300 animate-pulse">
                        </div>
                    )}

                    <MovieCard key={movie.id} movie={movie} />
                </>
            ))}
        </div>
    );
}