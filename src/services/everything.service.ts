// Everything HTTP Server API Service
import type {
  SearchOptions,
  BrowseOptions,
  SearchResult,
} from "@/types/everything.types";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

/**
 * Everything Search Service
 * Handles all API interactions with Everything HTTP Server
 */
class EverythingService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Search files using Everything HTTP Server API
   */
  async search(
    query: string,
    options: SearchOptions = {},
  ): Promise<SearchResult> {
    const {
      offset = 0,
      count = 50,
      sort = "name",
      ascending = 1,
      pathColumn = 1,
      sizeColumn = 1,
      dateModifiedColumn = 1,
    } = options;

    const params = new URLSearchParams({
      search: query,
      j: "1",
      o: offset.toString(),
      c: count.toString(),
      path_column: pathColumn.toString(),
      size_column: sizeColumn.toString(),
      date_modified_column: dateModifiedColumn.toString(),
      sort: sort,
      ascending: ascending.toString(),
    });

    try {
      const response = await fetch(`${this.baseUrl}/?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching search results:", error);
      throw error;
    }
  }

  /**
   * Browse folder contents using Everything HTTP Server API
   */
  async browse(
    folderPath: string,
    options: BrowseOptions = {},
  ): Promise<SearchResult> {
    const { offset = 0, count = 100, sort = "name", ascending = 1 } = options;

    const searchQuery = `parent:"${folderPath}"`;

    const params = new URLSearchParams({
      search: searchQuery,
      j: "1",
      o: offset.toString(),
      c: count.toString(),
      path_column: "1",
      size_column: "1",
      date_modified_column: "1",
      sort: sort,
      ascending: ascending.toString(),
    });

    try {
      const response = await fetch(`${this.baseUrl}/?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error browsing folder:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const everythingService = new EverythingService();

// Export class for testing/custom instances
export { EverythingService };
