/**
 * The User interface represents a user in the system.
 */
export interface User {
    /**
     * The unique identifier for the user.
     * 
     * @type {number}
     */
    id: number;

    /**
     * The first name of the user.
     * 
     * @type {string}
     */
    firstName: string;

    /**
     * The last name of the user.
     * 
     * @type {string}
     */
    lastName: string;

    /**
     * The maiden name of the user.
     * 
     * @type {string}
     */
    maidenName: string;

    /**
     * The age of the user.
     * 
     * @type {number}
     */
    age: number;

    /**
     * The gender of the user.
     * 
     * @type {string}
     */
    gender: string;

    /**
     * The email address of the user.
     * 
     * @type {string}
     */
    email: string;

    /**
     * The phone number of the user.
     * 
     * @type {string}
     */
    phone: string;

    /**
     * The username of the user.
     * 
     * @type {string}
     */
    username: string;

    /**
     * The password of the user.
     * 
     * @type {string}
     */
    password: string;

    /**
     * The birth date of the user.
     * 
     * @type {string}
     */
    birthDate: string;

    /**
     * The URL of the user's profile image.
     * 
     * @type {string}
     */
    image: string;

    /**
     * The blood group of the user.
     * 
     * @type {string}
     */
    bloodGroup: string;

    /**
     * The height of the user in centimeters.
     * 
     * @type {number}
     */
    height: number;

    /**
     * The weight of the user in kilograms.
     * 
     * @type {number}
     */
    weight: number;

    /**
     * The eye color of the user.
     * 
     * @type {string}
     */
    eyeColor: string;

    /**
     * The hair details of the user.
     * 
     * @type {Hair}
     */
    hair: Hair;

    /**
     * The domain of the user's email or website.
     * 
     * @type {string}
     */
    domain: string;

    /**
     * The IP address of the user.
     * 
     * @type {string}
     */
    ip: string;

    /**
     * The address of the user.
     * 
     * @type {Address}
     */
    address: Address;

    /**
     * The MAC address of the user's device.
     * 
     * @type {string}
     */
    macAddress: string;

    /**
     * The university the user attends or graduated from.
     * 
     * @type {string}
     */
    university: string;

    /**
     * The bank details of the user.
     * 
     * @type {Bank}
     */
    bank: Bank;

    /**
     * The company details of the user.
     * 
     * @type {Company}
     */
    company: Company;

    /**
     * The employer identification number of the user.
     * 
     * @type {string}
     */
    ein: string;

    /**
     * The social security number of the user.
     * 
     * @type {string}
     */
    ssn: string;

    /**
     * The user agent string of the user's browser.
     * 
     * @type {string}
     */
    userAgent: string;

    /**
     * The cryptocurrency details of the user.
     * 
     * @type {Crypto}
     */
    crypto: Crypto;
}

/**
 * The Crypto interface represents cryptocurrency details of a user.
 */
export interface Crypto {
    /**
     * The name of the cryptocurrency coin.
     * 
     * @type {string}
     */
    coin: string;

    /**
     * The wallet address of the cryptocurrency.
     * 
     * @type {string}
     */
    wallet: string;

    /**
     * The network of the cryptocurrency.
     * 
     * @type {string}
     */
    network: string;
}

/**
 * The Company interface represents the details of a user's company.
 */
export interface Company {
    /**
     * The address of the company.
     * 
     * @type {Address}
     */
    address: Address;

    /**
     * The department the user works in.
     * 
     * @type {string}
     */
    department: string;

    /**
     * The name of the company.
     * 
     * @type {string}
     */
    name: string;

    /**
     * The title or position of the user in the company.
     * 
     * @type {string}
     */
    title: string;
}

/**
 * The Bank interface represents the bank details of a user.
 */
export interface Bank {
    /**
     * The expiration date of the user's bank card.
     * 
     * @type {string}
     */
    cardExpire: string;

    /**
     * The number of the user's bank card.
     * 
     * @type {string}
     */
    cardNumber: string;

    /**
     * The type of the user's bank card (e.g., Visa, MasterCard).
     * 
     * @type {string}
     */
    cardType: string;

    /**
     * The currency of the user's bank account.
     * 
     * @type {string}
     */
    currency: string;

    /**
     * The International Bank Account Number (IBAN) of the user's bank account.
     * 
     * @type {string}
     */
    iban: string;
}

/**
 * The Address interface represents a physical address.
 */
export interface Address {
    /**
     * The street address.
     * 
     * @type {string}
     */
    address: string;

    /**
     * The city of the address.
     * 
     * @type {string}
     */
    city: string;

    /**
     * The geographical coordinates of the address.
     * 
     * @type {Coordinates}
     */
    coordinates: Coordinates;

    /**
     * The postal code of the address.
     * 
     * @type {string}
     */
    postalCode: string;

    /**
     * The state of the address.
     * 
     * @type {string}
     */
    state: string;
}

/**
 * The Coordinates interface represents geographical coordinates.
 */
export interface Coordinates {
    /**
     * The latitude coordinate.
     * 
     * @type {number}
     */
    lat: number;

    /**
     * The longitude coordinate.
     * 
     * @type {number}
     */
    lng: number;
}

/**
 * The Hair interface represents hair details of a user.
 */
export interface Hair {
    /**
     * The color of the user's hair.
     * 
     * @type {string}
     */
    color: string;

    /**
     * The type of the user's hair (e.g., curly, straight).
     * 
     * @type {string}
     */
    type: string;
}
