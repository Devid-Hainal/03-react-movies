import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const movies = await fetchMovies(query);

        setMovies(movies);

        if (movies.length === 0) {
          toast.error("No movies found for your request.");
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);
  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
      {movies.length > 0 && <MovieGrid movies={movies} />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
}
