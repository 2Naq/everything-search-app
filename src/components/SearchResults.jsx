import FileItem from "./FileItem";
import "./SearchResults.css";

function SearchResults({
  results,
  totalResults,
  isLoading,
  error,
  sortConfig,
  onSort,
  onOpen,
}) {
  if (error) {
    return (
      <div className="results-error">
        <div className="error-icon">⚠️</div>
        <h3>Connection Error</h3>
        <p>Could not connect to Everything HTTP Server.</p>
        <p className="error-hint">
          Make sure Everything is running and HTTP server is enabled on port
          8089.
        </p>
      </div>
    );
  }

  if (isLoading && (!results || results.length === 0)) {
    return (
      <div className="results-loading">
        <div className="loading-spinner" />
        <p>Searching...</p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="results-empty">
        <div className="empty-icon">🔍</div>
        <h3>No results found</h3>
        <p>Try a different search term</p>
      </div>
    );
  }

  const handleSort = (column) => {
    if (onSort) {
      onSort(column);
    }
  };

  const getSortIndicator = (column) => {
    if (sortConfig.column !== column) return null;
    return sortConfig.ascending ? " ↑" : " ↓";
  };

  return (
    <div className="search-results">
      <div className="results-header">
        <span className="results-count">
          {totalResults.toLocaleString()} results
        </span>
      </div>

      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th className="col-name" onClick={() => handleSort("name")}>
                NAME{getSortIndicator("name")}
              </th>
              <th className="col-path" onClick={() => handleSort("path")}>
                PATH{getSortIndicator("path")}
              </th>
              <th className="col-size" onClick={() => handleSort("size")}>
                SIZE{getSortIndicator("size")}
              </th>
              <th
                className="col-date"
                onClick={() => handleSort("date_modified")}
              >
                DATE MODIFIED{getSortIndicator("date_modified")}
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <FileItem
                key={`${item.path}-${item.name}-${index}`}
                item={item}
                onOpen={onOpen}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchResults;
