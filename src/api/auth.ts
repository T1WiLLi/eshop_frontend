import axios from 'axios';
import { AuthResponse } from "../interface/auth";
import { User } from "../interface/user";
import { Cookie } from "../lib/Cookie";
import { formatUser } from "./apiHelper";

export class Auth { // Singleton

    private static instance: Auth;

    private apiUrl: string;
    private token: string | null;

    private constructor() {
        this.apiUrl = 'https://dummyjson.com/auth';
        this.token = null;
    }

    public static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

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

    async refreshSession(expiresInMins: number = 120): Promise<void> {
        if (!this.token) {
            throw new Error('No token available. Please login first.');
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
        } catch (error: any) {
            throw new Error(`Error refreshing session: ${error.message}`);
        }
    }
}
