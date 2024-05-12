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

    async fetchUserFromId(id: number): Promise<User> {
        try {
            const res = await fetch(`${this.apiUrl}user/${id}`)
            if (!res.ok) {
                throw new Error('Failed to fetch product data');
            }
            const userData = await res.json();
            return formatUser(userData);
        } catch (error: any) {
            throw new Error(`Error fetching user data: ${error.message}`);
        }
    }
 
    async fetchAllProduct(): Promise<Product[]> {
        try {
            const res = await fetch(`${this.apiUrl}products?limit=0`);
            if (!res.ok) {
                throw new Error('Failed to fetch product data');
            }
            const rawData = await res.json();
            const productsData = rawData.products;
            return productsData.map((productsData: any) => formatProduct(productsData));
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }

    async fetchProductFromId(id: number): Promise<Product> {
        try {
            const res = await fetch(`${this.apiUrl}products/${id}`);
            if (!res.ok) {
                throw new Error('Failed to fetch product data');
            }
            const productData = await res.json();
            return formatProduct(productData);
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }
}