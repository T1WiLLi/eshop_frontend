import axios from 'axios';
import { Product } from "../interface/product";
import { User } from "../interface/user";
import { formatOrder, formatProduct, formatUser } from "./apiHelper";
import { Order } from '../interface/Orders';

export class Fetcher { // Singleton

    private static instance: Fetcher;
    private apiUrl: string;

    private constructor() {
        this.apiUrl = 'https://dummyjson.com/'; // This can then either be /user or /products or /carts
    }

    public static getInstance(): Fetcher {
        if (!Fetcher.instance) {
            Fetcher.instance = new Fetcher();
        }
        return Fetcher.instance;
    }

    async fetchAllUser(): Promise<User[]> {
        try {
            const res = await axios.get(`${this.apiUrl}user`);
            return res.data.map((userData: any) => formatUser(userData));
        } catch (error: any) {
            throw new Error(`Error fetching user data: ${error.message}`);
        }
    }

    async fetchUserFromId(id: number): Promise<User> {
        try {
            const res = await axios.get(`${this.apiUrl}user/${id}`);
            return formatUser(res.data);
        } catch (error: any) {
            throw new Error(`Error fetching user data: ${error.message}`);
        }
    }
 
    async fetchAllProduct(): Promise<Product[]> {
        try {
            const res = await axios.get(`${this.apiUrl}products?limit=0`);
            const productsData = res.data.products;
            return productsData.map((productsData: any) => formatProduct(productsData));
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }

    async fetchProductFromId(id: number): Promise<Product> {
        try {
            const res = await axios.get(`${this.apiUrl}products/${id}`);
            return formatProduct(res.data);
        } catch (error: any) {
            throw new Error(`Error fetching product data: ${error.message}`);
        }
    }

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