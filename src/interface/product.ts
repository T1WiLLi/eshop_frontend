/**
 * The Dimensions interface represents the dimensions of a product.
 */
export interface Dimensions {
    /**
     * The width of the product.
     * 
     * @type {number}
     */
    width: number;

    /**
     * The height of the product.
     * 
     * @type {number}
     */
    height: number;

    /**
     * The depth of the product.
     * 
     * @type {number}
     */
    depth: number;
}

/**
 * The Review interface represents a review of a product.
 */
export interface Review {
    /**
     * The rating given in the review.
     * 
     * @type {number}
     */
    rating: number;

    /**
     * The comment or feedback provided in the review.
     * 
     * @type {string}
     */
    comment: string;

    /**
     * The date when the review was posted.
     * 
     * @type {string}
     */
    date: string;

    /**
     * The name of the reviewer.
     * 
     * @type {string}
     */
    reviewerName: string;

    /**
     * The email of the reviewer.
     * 
     * @type {string}
     */
    reviewerEmail: string;
}

/**
 * The Meta interface represents the metadata associated with a product.
 */
export interface Meta {
    /**
     * The date and time when the product was created.
     * 
     * @type {string}
     */
    createdAt: string;

    /**
     * The date and time when the product was last updated.
     * 
     * @type {string}
     */
    updatedAt: string;

    /**
     * The barcode associated with the product.
     * 
     * @type {string}
     */
    barcode: string;

    /**
     * The QR code associated with the product.
     * 
     * @type {string}
     */
    qrCode: string;
}

/**
 * The Product interface represents a product available for sale.
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
     * The description of the product.
     * 
     * @type {string}
     */
    description: string;

    /**
     * The category to which the product belongs.
     * 
     * @type {string}
     */
    category: string;

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
     * The average rating of the product based on user reviews.
     * 
     * @type {number}
     */
    rating: number;

    /**
     * The available stock quantity of the product.
     * 
     * @type {number}
     */
    stock: number;

    /**
     * An array of tags associated with the product.
     * 
     * @type {string[]}
     */
    tags: string[];

    /**
     * The brand or manufacturer of the product.
     * 
     * @type {string}
     */
    brand: string;

    /**
     * The SKU (stock keeping unit) code of the product.
     * 
     * @type {string}
     */
    sku: string;

    /**
     * The weight of the product in kilograms.
     * 
     * @type {number}
     */
    weight: number;

    /**
     * The dimensions of the product.
     * 
     * @type {Dimensions}
     */
    dimensions: Dimensions;

    /**
     * Information about the product's warranty.
     * 
     * @type {string}
     */
    warrantyInformation: string;

    /**
     * Information about the product's shipping.
     * 
     * @type {string}
     */
    shippingInformation: string;

    /**
     * The availability status of the product.
     * 
     * @type {string}
     */
    availabilityStatus: string;

    /**
     * An array of reviews for the product.
     * 
     * @type {Review[]}
     */
    reviews: Review[];

    /**
     * The return policy for the product.
     * 
     * @type {string}
     */
    returnPolicy: string;

    /**
     * The minimum order quantity required for the product.
     * 
     * @type {number}
     */
    minimumOrderQuantity: number;

    /**
     * The metadata associated with the product.
     * 
     * @type {Meta}
     */
    meta: Meta;

    /**
     * An array of URLs pointing to images of the product.
     * 
     * @type {string[]}
     */
    images: string[];

    /**
     * The URL of the thumbnail image representing the product.
     * 
     * @type {string}
     */
    thumbnail: string;
}
