import MovieList from "@/components/MovieList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Film Dark</h1>
      <p className="text-lg mb-8">The best place
        <span className="font-bold">  to find the best movies.</span></p>
      <Link href="/browse" className="bg-red-600 text-white px-4 py-2 rounded">
        Start Browsing
      </Link>

      <hr className="my-5" />
      <h2 className="text-2xl font-bold mb-4">Watch Trailer</h2>
      {/* Embedding the video player */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <div className="relative h-64 w-72 overflow-hidden rounded-lg shadow-md">
          <Link className="hover:opacity-80 transition-all fade-in duration-300 hover:scale-105 hover:cursor-pointer" href="https://dood.li/e/qjks88z2vhft">
            <img src="/2024-10-09.png" alt="Movie Trailer" className="w-full h-full object-cover" />
          </Link>
        </div>
        <div className="relative h-64 w-72 overflow-hidden rounded-lg shadow-md">
          <Link className="hover:opacity-80 transition-all fade-in duration-300 hover:scale-105 hover:cursor-pointer" href="https://dood.li/e/611zlb91dswr">
            <img src="https://img.doodcdn.co/splash/y5tt360oqqj18hoj.jpg" alt="Movie Trailer" className="w-full h-full object-cover" />
          </Link>
        </div>
      </div>
      <hr className="my-8" />
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
        <MovieList />
      </div>
    </main>
  );
}