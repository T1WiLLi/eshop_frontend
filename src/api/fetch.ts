import axios from 'axios';
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
}