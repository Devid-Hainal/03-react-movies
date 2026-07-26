import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

export default function App() {
  const handleSearch = (query: string) => {
    const searchMovie = query;
    console.log("Your movie is", searchMovie);
  };
  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
