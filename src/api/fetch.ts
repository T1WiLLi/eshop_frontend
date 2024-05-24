import axios from 'axios';
import { Product } from "../interface/product";
import { User } from "../interface/user";
import { formatOrder, formatProduct, formatUser } from "./apiHelper";
import { Order } from '../interface/Orders';

/**
 * Singleton class for handling API requests related to fetching user, product, and cart data.
 */
export class Fetcher {
    private static instance: Fetcher;
    private apiUrl: string;

    /**
     * Private constructor to prevent external instantiation.
     */
    private constructor() {
        this.apiUrl = 'https://dummyjson.com/'; // This can then either be /user or /products or /carts
    }

    /**
     * Returns the singleton instance of the Fetcher class.
     * @returns The singleton instance of the Fetcher class.
     */
    public static getInstance(): Fetcher {
        if (!Fetcher.instance) {
            Fetcher.instance = new Fetcher();
        }
        return Fetcher.instance;
    }

    /**
     * Fetches all user data from the API.
     * @returns An array of User objects.
     * @throws Error if there is an error fetching user data.
     */
    async fetchAllUser(): Promise<User[]> {
        try {
            const res = await axios.get(`${this.apiUrl}user`);
            return res.data.map((userData: any) => formatUser(userData));
        } catch (error: any) {
            throw new Error(`Error fetching user data: ${error.message}`);
        }
    }

    /**
     * Fetches user data by ID from the API.
     * @param id - The ID of the user to fetch.
     * @returns The User object corresponding to the provided ID.
     * @throws Error if there is an error fetching user data.
     */
    async fetchUserFromId(id: number): Promise<User> {
        try {
            const res = await axios.get(`${this.apiUrl}user/${id}`);
            return formatUser(res.data);
        } catch (error: any) {
            throw new Error(`Error fetching user data: ${error.message}`);
        }
    }

    /**
     * Fetches all product data from the API.
     * @returns An array of Product objects.
     * @throws Error if there is an error fetching product data.
     */
    async fetchAllProduct(): Promise<Product[]> {
        try {
            const res = await axios.get(`${this.apiUrl}products?limit=0`);
            const productsData = res.data.products;
            return productsData.map((productsData: any) => formatProduct(productsData));
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }

    /**
     * Fetches product data by ID from the API.
     * @param id - The ID of the product to fetch.
     * @returns The Product object corresponding to the provided ID.
     * @throws Error if there is an error fetching product data.
     */
    async fetchProductFromId(id: number): Promise<Product> {
        try {
            const res = await axios.get(`${this.apiUrl}products/${id}`);
            return formatProduct(res.data);
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }

    /**
     * Fetches all cart data from the API.
     * @returns An array of Order objects representing cart data.
     * @throws Error if there is an error fetching cart data.
     */
    async fetchAllCart(): Promise<Order[]> {
        try {
            const res = await axios.get(`${this.apiUrl}carts?limit=0`);
            const orders: Order[] = res.data.carts.map(formatOrder);
            return orders;
        } catch (error: any) {
            throw new Error(`Error fetching cart data: ${error.message}`);
        }
    }
}
