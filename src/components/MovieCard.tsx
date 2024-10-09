import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";

export default function MovieCard({ movie }: { movie: any }) {
    return (
        <>
            <Link key={movie.id} className="hover:opacity-80 transition-all duration-300 hover:scale-105 hover:cursor-pointer" href={`/movie/${movie.id}`}>
                <div className="relative h-64 w-72 overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={movie.poster}
                        alt={movie.title}
                        width={300}
                        height={300}
                        className="object-cover"
                        objectFit="cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                        <p className="text-white text-sm">{movie.year}</p>
                        <p className="text-white text-sm">{movie.genre}</p>
                        <p className="text-white text-sm">{movie.rating}</p>
                    </div>
                </div>
            </Link>
        </>
    );
}