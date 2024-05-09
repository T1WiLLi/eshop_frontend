import { Product } from "./product";

export interface BasketItem {
    product: Product;
    amount: number;
}

export interface BasketContextValue {
    products: BasketItem[];
    addToBasket: (product: Product) => void;
    handleIncrement: (productId: number) => void;
    handleDecrement: (productId: number) => void;
    handleRemove: (productId: number) => void;
    calculateSubtotal: () => number;
    handleCheckout: () => void;
}