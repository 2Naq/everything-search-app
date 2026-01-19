import { useState, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Pagination from "./components/Pagination";
import { searchFiles } from "./services/everythingApi";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(50);
  const [currentQuery, setCurrentQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    column: "name",
    ascending: true,
  });

  const performSearch = useCallback(
    async (query, page = 1, perPage = resultsPerPage, sort = sortConfig) => {
      if (!query.trim()) {
        setResults([]);
        setTotalResults(0);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      setCurrentQuery(query);

      try {
        const offset = (page - 1) * perPage;
        const data = await searchFiles(query, {
          offset,
          count: perPage,
          sort: sort.column,
          ascending: sort.ascending ? 1 : 0,
        });

        setResults(data.results || []);
        setTotalResults(data.totalResults || 0);
        setCurrentPage(page);
      } catch (err) {
        setError(err.message);
        setResults([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    },
    [resultsPerPage, sortConfig],
  );

  const handleSearch = useCallback(
    (query) => {
      setCurrentPage(1);
      performSearch(query, 1, resultsPerPage, sortConfig);
    },
    [performSearch, resultsPerPage, sortConfig],
  );

  const handlePageChange = (page) => {
    performSearch(currentQuery, page, resultsPerPage, sortConfig);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResultsPerPageChange = (perPage) => {
    setResultsPerPage(perPage);
    performSearch(currentQuery, 1, perPage, sortConfig);
  };

  const handleSort = (column) => {
    const newSortConfig = {
      column,
      ascending: sortConfig.column === column ? !sortConfig.ascending : true,
    };
    setSortConfig(newSortConfig);
    performSearch(currentQuery, currentPage, resultsPerPage, newSortConfig);
  };

  const handleOpenFile = (item) => {
    // Open file using Everything HTTP Server download endpoint
    const filePath = item.path ? `${item.path}\\${item.name}` : item.name;
    window.open(
      `http://localhost:8089/${encodeURIComponent(filePath)}`,
      "_blank",
    );
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="app">
      <div className="container">
        <Header />

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <SearchResults
          results={results}
          totalResults={totalResults}
          isLoading={isLoading}
          error={error}
          sortConfig={sortConfig}
          onSort={handleSort}
          onOpen={handleOpenFile}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            resultsPerPage={resultsPerPage}
            onResultsPerPageChange={handleResultsPerPageChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
