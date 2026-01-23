export const STORAGE_KEY = "everything_server_url";
export const DEFAULT_SERVER_URL =
  import.meta.env.VITE_EVERYTHING_URL || "http://localhost:80";

class SettingsService {
  getServerUrl(): string {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_SERVER_URL;
  }

  setServerUrl(url: string): void {
    if (!url) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, url);
    }
  }

  resetServerUrl(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const settingsService = new SettingsService();
