import axios from "axios";
import type { Movie } from "../types/movie";

interface ResponseHttpsMovie {
  results: Movie[];
}

const myKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${myKey}` },
});

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await api.get<ResponseHttpsMovie>("/search/movie", {
    params: {
      query,
    },
  });
  return response.data.results;
}
