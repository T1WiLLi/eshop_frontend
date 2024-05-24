/**
 * Utility class for managing session cookies.
 */
export class Cookie {
    private static tokenName: string = 'sessionToken';

    /**
     * Creates a new Cookie instance.
     * 
     * @param {string | null} token - The session token value.
     */
    constructor(private token: string | null) {
        if (token) {
            this.setToken(token);
        }
    }

    /**
     * Sets the session token in the cookie.
     * 
     * @param {string} token - The session token value.
     */
    private setToken(token: string): void {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 120 * 60 * 1000); // Expires in 120 minutes
        document.cookie = `${Cookie.tokenName}=${token}; expires=${expiryDate.toUTCString()}; path=/`;
        this.token = token;
    }

    /**
     * Retrieves the session token from the cookie.
     * 
     * @returns {string | null} - The session token value, or null if not found.
     */
    public static getToken(): string | null {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === Cookie.tokenName) {
                return value;
            }
        }
        return null;
    }

    /**
     * Destroys the session token by expiring it immediately.
     */
    public static destroyToken(): void {
        const expiryDate = new Date(0);
        document.cookie = `${Cookie.tokenName}=; expires=${expiryDate.toUTCString()}; path=/`;
    }

    /**
     * Refreshes the expiry of the session token.
     * 
     * @returns {boolean} - Indicates whether the token expiry was successfully refreshed.
     */
    public refreshExpiry(): boolean {
        if (this.token) {
            this.setToken(this.token); 
            return true;
        }
        return false;
    }
}
