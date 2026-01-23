import { createFileRoute } from "@tanstack/react-router";

import { useState, useCallback, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import Pagination from "@/components/Pagination";
import Breadcrumb from "@/components/Breadcrumb";
import FilePreview from "@/components/FilePreview";
import LoginDialog from "@/components/LoginDialog";
import ConnectionStatus from "@/components/ConnectionStatus";
import { Button } from "@/components/ui/button";
import {
  everythingService,
  AuthenticationError,
} from "@/services/everything.service";
import { authService } from "@/services/auth.service";
import type {
  FileItem,
  SearchOptions,
  BrowseOptions,
} from "@/types/everything.types";

interface SortConfig {
  column: string;
  ascending: boolean;
}

type ViewMode = "search" | "browse";

export const Route = createFileRoute("/everything-search")({
  component: EverythingSearchPage,
});

function EverythingSearchPage() {
  const [results, setResults] = useState<FileItem[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(50);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("search");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: "name",
    ascending: true,
  });

  // File preview state
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Auth state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated(),
  );
  // Check auth status on mount
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const handleAuthError = useCallback(() => {
    setIsLoginOpen(true);
  }, []);

  const performSearch = useCallback(
    async (
      query: string,
      page: number = 1,
      perPage: number = resultsPerPage,
      sort: SortConfig = sortConfig,
    ) => {
      if (!query.trim()) {
        setResults([]);
        setTotalResults(0);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      setCurrentQuery(query);
      setViewMode("search");
      setCurrentPath(null);

      try {
        const offset = (page - 1) * perPage;
        const options: SearchOptions = {
          offset,
          count: perPage,
          sort: sort.column,
          ascending: sort.ascending ? 1 : 0,
        };
        const data = await everythingService.search(query, options);

        setResults(data.results || []);
        setTotalResults(data.totalResults || 0);
        setCurrentPage(page);
      } catch (err) {
        if (err instanceof AuthenticationError) {
          handleAuthError();
          setError("Authentication required");
        } else {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
        setResults([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    },
    [resultsPerPage, sortConfig, handleAuthError],
  );

  const performBrowse = useCallback(
    async (
      folderPath: string,
      page: number = 1,
      perPage: number = resultsPerPage,
      sort: SortConfig = sortConfig,
    ) => {
      setIsLoading(true);
      setError(null);
      setViewMode("browse");
      setCurrentPath(folderPath);
      setCurrentQuery("");

      try {
        const offset = (page - 1) * perPage;
        const options: BrowseOptions = {
          offset,
          count: perPage,
          sort: sort.column,
          ascending: sort.ascending ? 1 : 0,
        };
        const data = await everythingService.browse(folderPath, options);

        setResults(data.results || []);
        setTotalResults(data.totalResults || 0);
        setCurrentPage(page);
      } catch (err) {
        if (err instanceof AuthenticationError) {
          handleAuthError();
          setError("Authentication required");
        } else {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
        setResults([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    },
    [resultsPerPage, sortConfig, handleAuthError],
  );

  const handleSearch = useCallback(
    (query: string) => {
      setCurrentPage(1);
      performSearch(query, 1, resultsPerPage, sortConfig);
    },
    [performSearch, resultsPerPage, sortConfig],
  );

  const handlePageChange = (page: number) => {
    if (viewMode === "browse" && currentPath) {
      performBrowse(currentPath, page, resultsPerPage, sortConfig);
    } else {
      performSearch(currentQuery, page, resultsPerPage, sortConfig);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResultsPerPageChange = (perPage: number) => {
    setResultsPerPage(perPage);
    if (viewMode === "browse" && currentPath) {
      performBrowse(currentPath, 1, perPage, sortConfig);
    } else {
      performSearch(currentQuery, 1, perPage, sortConfig);
    }
  };

  const handleSort = (column: string) => {
    const newSortConfig: SortConfig = {
      column,
      ascending: sortConfig.column === column ? !sortConfig.ascending : true,
    };
    setSortConfig(newSortConfig);
    if (viewMode === "browse" && currentPath) {
      performBrowse(currentPath, currentPage, resultsPerPage, newSortConfig);
    } else {
      performSearch(currentQuery, currentPage, resultsPerPage, newSortConfig);
    }
  };

  const handleItemClick = (item: FileItem) => {
    const isFolder = item.type === "folder" || !item.size;

    if (isFolder) {
      const folderPath = item.path ? `${item.path}\\${item.name}` : item.name;
      performBrowse(folderPath, 1, resultsPerPage, sortConfig);
    } else {
      // Open file preview modal instead of new tab
      setPreviewFile(item);
      setIsPreviewOpen(true);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  const handleBreadcrumbNavigate = (path: string | null) => {
    if (path === null) {
      setResults([]);
      setTotalResults(0);
      setCurrentPath(null);
      setViewMode("search");
    } else {
      performBrowse(path, 1, resultsPerPage, sortConfig);
    }
  };

  const handleLogin = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const success = await everythingService.testConnection(username, password);
    if (success) {
      authService.setCredentials({ username, password });
      setIsAuthenticated(true);
      setError(null);
      // Retry last action
      if (currentQuery) {
        performSearch(currentQuery, currentPage, resultsPerPage, sortConfig);
      }
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setResults([]);
    setTotalResults(0);
    setCurrentQuery("");
    setCurrentPath(null);
  };

  const totalPages = Math.ceil(totalResults / resultsPerPage);
  return (
    <div>
      <header className="bg-card sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between px-6  shadow transition-colors duration-300">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        {/* Auth status bar */}
        <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground min-w-64">
          <ConnectionStatus />
          {isAuthenticated && (
            <>
              <User className="h-4 w-4" />
              <span>{authService.getCredentials()?.username || "no user"}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-7 gap-1 text-xs"
              >
                <LogOut className="h-3 w-3" />
                Logout
              </Button>
            </>
          )}
        </div>
      </header>
      <main className="w-full">
        <div className="p-6">
          {viewMode === "browse" && currentPath && (
            <Breadcrumb
              currentPath={currentPath}
              onNavigate={handleBreadcrumbNavigate}
            />
          )}

          <SearchResults
            results={results}
            totalResults={totalResults}
            isLoading={isLoading}
            error={error}
            sortConfig={sortConfig}
            onSort={handleSort}
            onOpen={handleItemClick}
            viewMode={viewMode}
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

        {/* File Preview Modal */}
        <FilePreview
          file={previewFile}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
        />

        {/* Login Dialog */}
        <LoginDialog
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
          error={null}
        />
      </main>
    </div>
  );
}
