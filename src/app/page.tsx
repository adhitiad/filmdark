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

      <hr className="my-8" />
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
        <MovieList />
      </div>



    </main>
  );
}