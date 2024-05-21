import { Product } from "./product";

/**
 * The BasketItem interface represents an item in the shopping basket.
 */
export interface BasketItem {
    /**
     * The product added to the basket.
     * 
     * @type {Product}
     */
    product: Product;

    /**
     * The quantity of the product added to the basket.
     * 
     * @type {number}
     */
    amount: number;
}

/**
 * The BasketContextValue interface defines the structure of the context value for a shopping basket.
 * It includes the list of products in the basket and various methods for managing the basket.
 */
export interface BasketContextValue {
    /**
     * An array of items currently in the basket.
     * 
     * @type {BasketItem[]}
     */
    products: BasketItem[];

    /**
     * Adds a product to the basket. If the product is already in the basket, increments the quantity.
     * 
     * @param {Product} product - The product to add to the basket.
     */
    addToBasket: (product: Product) => void;

    /**
     * Increments the quantity of a product in the basket by 1.
     * 
     * @param {number} productId - The ID of the product to increment.
     */
    handleIncrement: (productId: number) => void;

    /**
     * Decrements the quantity of a product in the basket by 1. If the quantity reaches 0, the product is removed from the basket.
     * 
     * @param {number} productId - The ID of the product to decrement.
     */
    handleDecrement: (productId: number) => void;

    /**
     * Removes a product from the basket entirely.
     * 
     * @param {number} productId - The ID of the product to remove.
     */
    handleRemove: (productId: number) => void;

    /**
     * Calculates the subtotal of all items in the basket.
     * 
     * @returns {number} The subtotal cost of the items in the basket.
     */
    calculateSubtotal: () => number;

    /**
     * Handles the checkout process for the items in the basket.
     */
    handleCheckout: () => void;
}