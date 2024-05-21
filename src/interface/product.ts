/**
 * The Product interface represents a product in the system.
 */
export interface Product {
    /**
     * The unique identifier for the product.
     * 
     * @type {number}
     */
    id: number;

    /**
     * The title or name of the product.
     * 
     * @type {string}
     */
    title: string;

    /**
     * A detailed description of the product.
     * 
     * @type {string}
     */
    description: string;

    /**
     * The price of the product.
     * 
     * @type {number}
     */
    price: number;

    /**
     * The discount percentage applied to the product.
     * 
     * @type {number}
     */
    discountPercentage: number;

    /**
     * The rating of the product, typically out of 5.
     * 
     * @type {number}
     */
    rating: number;

    /**
     * The number of units available in stock.
     * 
     * @type {number}
     */
    stock: number;

    /**
     * The brand of the product.
     * 
     * @type {string}
     */
    brand: string;

    /**
     * The category to which the product belongs.
     * 
     * @type {string}
     */
    category: string;

    /**
     * The URL of the product's thumbnail image.
     * 
     * @type {string}
     */
    thumbnail: string;

    /**
     * An array of URLs for images of the product.
     * 
     * @type {string[]}
     */
    images: string[];
}