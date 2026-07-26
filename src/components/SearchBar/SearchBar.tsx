import toast, { Toaster } from "react-hot-toast";

// styles
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSearchForm = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();
    if (query === "") {
      toast.error("Please enter your search query.");
    }

    onSearch(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearchForm}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
    </header>
  );
}
