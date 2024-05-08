import { AuthResponse } from "../interface/auth";
import { User } from "../interface/user";
import { formatUser } from "./apiHelper";

export class Auth {
    private apiUrl: string;
    private token: string | null;

    constructor() {
        this.apiUrl = 'https://dummyjson.com/auth';
        this.token = null;
    }

    async loginUser(username: string, password: string, expiresInMins: number = 60): Promise<AuthResponse> {
        try {
            const res = await fetch(`${this.apiUrl}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins
                })
            });
            const data = await res.json();
            this.token = data.token;
            return {
                token: data.token,
                response: 'Login successful',
                success: true
            }
        } catch (error: any) {
            return {
                token: null,
                response: 'Invalid credentials',
                success: false
            };
        }
    }

    async getCurrentUser(): Promise<User> {
        if (!this.token) {
            throw new Error('No token available. Please login first.');
        }

        try {
            const res = await fetch(`${this.apiUrl}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            return formatUser(res.json());
        } catch (error: any) {
            throw new Error(`Error fetching current user: ${error.message}`);
        }
    }

    async refreshSession(expiresInMins: number = 60): Promise<void> {
        if (!this.token) {
            throw new Error('No token available. Please login first.');
        }

        try {
            const response = await fetch(`${this.apiUrl}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    expiresInMins
                })
            });
            const data = await response.json();
            this.token = data.token;
        } catch (error: any) {
            throw new Error(`Error refreshing session: ${error.message}`);
        }
    }
}