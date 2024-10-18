import Image from "next/image";

interface Movie {
  title: string;
  genre: string;
  rating: number;
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
      <Image
        src={movie.poster}
        alt={movie.title}
        className="w-full h-48 object-cover"
        width={300}
        height={200}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-gray-600 text-sm">{movie.genre}</p>
        <p className="text-yellow-500 text-sm">★ {movie.rating}</p>
      </div>
    </div>
  );
}
