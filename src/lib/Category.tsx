import { ReactNode } from "react";

export enum Category {
    'smartphones' = "mobile",
    'mobile-accessories' = "mobile",
    'tablets' = "tablet",
    'laptops' = "laptop",
    'fragrances' = "spray-can-sparkles",
    'skin-care' = "face-grin-hearts",
    'sports-accessories' = "baseball",
    'beauty' = "face-grin-hearts",
    'groceries' = "cart-shopping",
    'home-decoration' = "house",
    'furniture' = "couch",
    'tops' = "shirt",
    'womens-dresses' = "person-dress",
    'womens-shoes' = "shoe-prints",
    'mens-shirts' = "person",
    'mens-shoes' = "shoe-prints",
    'mens-watches' = "clock",
    'womens-watches' = "clock",
    'womens-bags' = "bag-shopping",
    'womens-jewellery' = "gem",
    'sunglasses' = "glasses",
    'automotive' = "car",
    'vehicle' = "car",
    'motorcycle' = "motorcycle",
    'lighting' = "lightbulb"
}

export namespace Category {
    export function getIcon(category: string): ReactNode | React.JSX.Element {
        const iconClass = Category[category as keyof typeof Category] as Category | ((category: string) => JSX.Element);
        if (!iconClass) {
            return <i className="fa-solid fa-question">-{category}</i>;
        }
        return <i className={`fa-solid fa-${iconClass}`}></i>
    }
}
