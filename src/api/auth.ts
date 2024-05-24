import axios from 'axios';
import { AuthResponse } from "../interface/auth";
import { User } from "../interface/user";
import { Cookie } from "../lib/Cookie";
import { formatUser } from "./apiHelper";

/**
 * Singleton class for handling authentication-related API calls.
 */
export class Auth { // Singleton

    private static instance: Auth;

    private apiUrl: string;
    private token: string | null;

    /**
     * Private constructor to prevent external instantiation.
     */
    private constructor() {
        this.apiUrl = 'https://dummyjson.com/auth';
        this.token = (Cookie.getToken()) ? Cookie.getToken() : null;
    }

    /**
     * Returns the singleton instance of the Auth class.
     * @returns The singleton instance of the Auth class.
     */
    public static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    /**
     * Logs in a user and returns an authentication response.
     * @param username - The username of the user.
     * @param password - The password of the user.
     * @param expiresInMins - Optional. The expiration time of the token in minutes (default is 120 minutes).
     * @returns An authentication response containing the token, response message, and success status.
     */
    async loginUser(username: string, password: string, expiresInMins: number = 120): Promise<AuthResponse> {
        try {
            const res = await axios.post(`${this.apiUrl}/login`, {
                username,
                password,
                expiresInMins
            });
            const data = res.data;
            this.token = data.token;
            if (this.token) {
                return {
                    token: data.token,
                    response: 'Login successful',
                    success: true
                };
            } else {
                return {
                    token: null,
                    response: 'Invalid credentials',
                    success: false
                };
            }
        } catch (error: any) {
            console.log(error.message);
            return {
                token: null,
                response: 'Internal Server Error',
                success: false
            };
        }
    }

    /**
     * Retrieves the current user's information.
     * @param token - The authentication token.
     * @returns The current user's information.
     * @throws Error if no token is provided.
     */
    async getCurrentUser(token: string | null): Promise<User> {
        if (!token) {
            throw new Error('No token available. Please login first.');
        }

        try {
            const res = await axios.get(`${this.apiUrl}/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return formatUser(res.data);
        } catch (error: any) {
            throw new Error(`Error fetching current user: ${error.message}`);
        }
    }

    /**
     * Refreshes the current session token.
     * @param expiresInMins - Optional. The expiration time of the new token in minutes (default is 120 minutes).
     */
    async refreshSession(expiresInMins: number = 120): Promise<void> {
        if (!this.token) {
            return;
        }

        try {
            const response = await axios.post(`${this.apiUrl}/refresh`, {
                expiresInMins
            }, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            const data = response.data;
            this.token = data.token;
            new Cookie(Cookie.getToken()).refreshExpiry();
        } catch (error: any) {}
    }
}
