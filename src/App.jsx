import React, { useState } from "react";
import { Search, Film } from "lucide-react";
import { motion } from "framer-motion";
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(""); // Changed to 'search' to match
  const [loading, setLoading] = useState(false);

  const API_KEY = "91d0f71a";

  const searchMovies = async (title) => {
    if (!title) return;
    setLoading(true);
    try {
      // Note: Use https instead of http to avoid security blocks
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`,
      );
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search); // Capital S in data.Search
      } else {
        setMovies([]); // Reset if no movies found
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <header className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Film className="text-emerald-400 w-10 h-10" />
          <h1 className="text-4xl font-bold tracking-tighter">
            CINE<span className="text-emerald-400">FLOW</span>
          </h1>
        </div>

        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search for movies (e.g. Batman)..."
            value={search} // Matches state
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchMovies(search)}
            className="w-full bg-slate-900 border-2 border-slate-800 rounded-full py-3 px-6 pl-12 focus:outline-none focus:border-emerald-400 transition-all text-lg"
          />
          <Search className="absolute left-4 top-3.5 text-slate-500" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center italic text-emerald-400">
            Searching the archives...
          </div>
        ) : (
          /* THE GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <motion.div
                key={movie.imdbID}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/400"
                  }
                  alt={movie.Title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">
                    {movie.Type}
                  </span>
                  <h3 className="text-lg font-bold mt-1 line-clamp-1">
                    {movie.Title}
                  </h3>
                  <p className="text-slate-400 text-sm">{movie.Year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
