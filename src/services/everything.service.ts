// Everything HTTP Server API Service
import type {
  SearchOptions,
  BrowseOptions,
  SearchResult,
} from "@/types/everything.types";
import { authService } from "./auth.service";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
const EVERYTHING_URL =
  import.meta.env.VITE_EVERYTHING_URL || "http://localhost:8090";

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
   * Make authenticated fetch request
   */
  private async fetchWithAuth(url: string): Promise<Response> {
    const headers = authService.getHeaders();
    const response = await fetch(url, { headers });

    // If 401 Unauthorized, throw specific error
    if (response.status === 401) {
      throw new AuthenticationError("Authentication required");
    }

    return response;
  }

  /**
   * Test connection with credentials
   */
  async testConnection(username?: string, password?: string): Promise<boolean> {
    const headers: HeadersInit = {};

    if (username && password) {
      const encoded = btoa(`${username}:${password}`);
      headers["Authorization"] = `Basic ${encoded}`;
    } else {
      const authHeader = authService.getAuthHeader();
      if (authHeader) {
        headers["Authorization"] = authHeader;
      }
    }

    try {
      // Try a simple search to test connection
      const params = new URLSearchParams({
        search: "",
        j: "1",
        c: "1",
      });

      const response = await fetch(`${this.baseUrl}/?${params.toString()}`, {
        headers,
      });
      return response.ok;
    } catch {
      return false;
    }
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
      const response = await this.fetchWithAuth(
        `${this.baseUrl}/?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
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
      const response = await this.fetchWithAuth(
        `${this.baseUrl}/?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      console.error("Error browsing folder:", error);
      throw error;
    }
  }

  /**
   * Get file URL for preview
   * Uses direct Everything URL with embedded credentials for media elements
   */
  getFileUrl(filePath: string): string {
    const credentials = authService.getCredentials();
    if (credentials) {
      // Embed credentials in URL for media elements (img, video, audio, iframe)
      // Format: http://username:password@host:port/path
      try {
        const url = new URL(
          `${EVERYTHING_URL}/${encodeURIComponent(filePath)}`,
        );
        url.username = credentials.username;
        url.password = credentials.password;
        return url.toString();
      } catch {
        // Fallback if URL parsing fails
        return `${EVERYTHING_URL}/${encodeURIComponent(filePath)}`;
      }
    }
    // No auth - use proxy URL which is now relative (compatible with both)
    return `${this.baseUrl}/${encodeURIComponent(filePath)}`;
  }
}

// Custom error for authentication
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

// Export singleton instance
export const everythingService = new EverythingService();

// Export class for testing/custom instances
export { EverythingService };
