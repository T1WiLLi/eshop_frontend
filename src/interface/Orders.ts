/**
 * The CartItem interface represents an item in the shopping cart.
 */
export interface CartItem {
    /**
     * The unique identifier for the cart item.
     * 
     * @type {number}
     */
    id: number;

    /**
     * The title or name of the cart item.
     * 
     * @type {string}
     */
    title: string;

    /**
     * The price of the cart item.
     * 
     * @type {number}
     */
    price: number;

    /**
     * The quantity of the cart item.
     * 
     * @type {number}
     */
    quantity: number;

    /**
     * The total price for the quantity of the cart item.
     * 
     * @type {number}
     */
    total: number;

    /**
     * The discount percentage applied to the cart item.
     * 
     * @type {number}
     */
    discountPercentage: number;

    /**
     * The price of the cart item after the discount is applied.
     * 
     * @type {number}
     */
    discountedPrice: number;

    /**
     * The URL of the cart item's thumbnail image.
     * 
     * @type {string}
     */
    thumbnail: string;
}

/**
 * The Order interface represents an order made by a user.
 */
export interface Order {
    /**
     * The unique identifier for the order.
     * 
     * @type {number}
     */
    id: number;

    /**
     * The list of products in the order.
     * 
     * @type {CartItem[]}
     */
    products: CartItem[];

    /**
     * The total price of the order.
     * 
     * @type {number}
     */
    total: number;

    /**
     * The total price of the order after discounts are applied.
     * 
     * @type {number}
     */
    discountedTotal: number;

    /**
     * The unique identifier for the user who made the order.
     * 
     * @type {number}
     */
    userId: number;

    /**
     * The total number of distinct products in the order.
     * 
     * @type {number}
     */
    totalProducts: number;

    /**
     * The total quantity of all products in the order.
     * 
     * @type {number}
     */
    totalQuantity: number;

    /**
     * The date when the order was made.
     * 
     * @type {string}
     */
    purchaseDate: string;
}
