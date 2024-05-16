export enum Category {
    'smartphones' = "mobile",
    'laptops' = "laptop",
    'fragrances' = "spray-can-sparkles",
    'skincare' = "face-grin-hearts",
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
    'motorcycle' = "motorcycle",
    'lighting' = "lightbulb"
}

export namespace Category {
    export function getIcon(category: string): JSX.Element {
        const iconClass = Category[category as keyof typeof Category];
        if (!iconClass) {
            return <i className="fa-solid fa-question"></i>;
        }
        return <i className={`fa-solid fa-${iconClass}`}></i>
    }
}
