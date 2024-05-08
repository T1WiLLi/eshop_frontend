import { Product } from "../interface/product";
import { User } from "../interface/user";
import { formatProduct, formatUser } from "./apiHelper";

export class Fetcher {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'https://dummyjson.com/'; // This can then either be /user or /products
    }

    async fetchAllUser(): Promise<User[]> {
        try {
            const res = await fetch(`${this.apiUrl}user`);
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }
            const usersData = await res.json();
            return usersData.map((userData: any) => formatUser(userData));
        } catch (error: any) {
            throw new Error(`Error fetching user data: ${error.message}`);
        }
    }

    async fetchAllProduct(): Promise<Product[]> {
        try {
            const res = await fetch(`${this.apiUrl}products`);
            if (!res.ok) {
                throw new Error('Failed to fetch product data');
            }
            const productsData = await res.json();
            return productsData.map((productsData: any) => formatProduct(productsData));
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }
}