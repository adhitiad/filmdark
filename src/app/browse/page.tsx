import MovieList from "@/components/MovieList";

export default function BrowsePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <header className="p-4">
                <h1 className="text-2xl font-bold">Film Dark Browse</h1>
            </header>
            <main className="p-4">
                <MovieList />
            </main>
        </div>
    );
}