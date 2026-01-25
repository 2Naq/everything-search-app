// Authentication Service for Everything HTTP Server
// Everything uses HTTP Basic Authentication

const AUTH_STORAGE_KEY = "everything_auth";

export interface AuthCredentials {
    username: string;
    password: string;
}

class AuthService {
    private credentials: AuthCredentials | null = null;

    constructor() {
        this.loadFromStorage();
    }

    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (stored) {
                this.credentials = JSON.parse(stored);
            }
        } catch {
            this.credentials = null;
        }
    }

    private saveToStorage(): void {
        if (this.credentials) {
            localStorage.setItem(
                AUTH_STORAGE_KEY,
                JSON.stringify(this.credentials)
            );
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }

    /**
     * Set credentials and save to storage
     */
    setCredentials(credentials: AuthCredentials): void {
        this.credentials = credentials;
        this.saveToStorage();
    }

    /**
     * Get current credentials
     */
    getCredentials(): AuthCredentials | null {
        return this.credentials;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return this.credentials !== null;
    }

    /**
     * Clear credentials and logout
     */
    logout(): void {
        this.credentials = null;
        this.saveToStorage();
    }

    /**
     * Get Basic Auth header value
     */
    getAuthHeader(): string | null {
        if (!this.credentials) return null;
        const encoded = btoa(
            `${this.credentials.username}:${this.credentials.password}`
        );
        return `Basic ${encoded}`;
    }

    /**
     * Create headers object with auth
     */
    getHeaders(): HeadersInit {
        const headers: HeadersInit = {};
        const authHeader = this.getAuthHeader();
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }
        return headers;
    }
}

export const authService = new AuthService();
export { AuthService };
