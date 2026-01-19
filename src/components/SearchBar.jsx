import { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Focus search on Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search files, folders, and documents..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isLoading && <div className="search-loading" />}
        <div className="search-shortcut">
          <kbd>CTRL</kbd>
          <kbd>K</kbd>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
