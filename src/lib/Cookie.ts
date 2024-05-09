export class Cookie {
    private static tokenName: string = 'sessionToken';

    constructor(private token: string | null) {
        if (token) {
            this.setToken(token);
        }
    }

    private setToken(token: string): void {
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 120 * 60 * 1000); // Expires in 120 minutes
        document.cookie = `${Cookie.tokenName}=${token}; expires=${expiryDate.toUTCString()}; path=/`;
        this.token = token;
    }

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

    public static destroyToken() {
        const expiryDate = new Date(0);
        document.cookie = `${Cookie.tokenName}=; expires=${expiryDate.toUTCString()}; path=/`;
    }

    public refreshExpiry(): void {
        if (this.token) {
            this.setToken(this.token); 
        }
    }
}
