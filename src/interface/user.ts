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
   * The profile image URL of the user.
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
   * The height of the user.
   *
   * @type {number}
   */
  height: number;
  /**
   * The weight of the user.
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
   * The MAC address of the user.
   *
   * @type {string}
   */
  macAddress: string;
  /**
   * The university of the user.
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
   * The EIN (Employer Identification Number) of the user.
   *
   * @type {string}
   */
  ein: string;
  /**
   * The SSN (Social Security Number) of the user.
   *
   * @type {string}
   */
  ssn: string;
  /**
   * The user agent of the user's client.
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
  /**
   * The role of the user.
   *
   * @type {string}
   */
  role: string;
}

export interface Crypto {
  /**
   * The cryptocurrency coin.
   *
   * @type {string}
   */
  coin: string;
  /**
   * The cryptocurrency wallet.
   *
   * @type {string}
   */
  wallet: string;
  /**
   * The cryptocurrency network.
   *
   * @type {string}
   */
  network: string;
}

export interface Company {
  /**
   * The department of the company.
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
   * The title or position within the company.
   *
   * @type {string}
   */
  title: string;
  /**
   * The address of the company.
   *
   * @type {Address}
   */
  address: Address;
}

export interface Bank {
  /**
   * The expiration date of the bank card.
   *
   * @type {string}
   */
  cardExpire: string;
  /**
   * The bank card number.
   *
   * @type {string}
   */
  cardNumber: string;
  /**
   * The type of bank card.
   *
   * @type {string}
   */
  cardType: string;
  /**
   * The currency used by the bank.
   *
   * @type {string}
   */
  currency: string;
  /**
   * The IBAN (International Bank Account Number).
   *
   * @type {string}
   */
  iban: string;
}

export interface Address {
  /**
   * The street address.
   *
   * @type {string}
   */
  address: string;
  /**
   * The city.
   *
   * @type {string}
   */
  city: string;
  /**
   * The state or province.
   *
   * @type {string}
   */
  state: string;
  /**
   * The state code.
   *
   * @type {string}
   */
  stateCode: string;
  /**
   * The postal code.
   *
   * @type {string}
   */
  postalCode: string;
  /**
   * The geographic coordinates.
   *
   * @type {Coordinates}
   */
  coordinates: Coordinates;
  /**
   * The country.
   *
   * @type {string}
   */
  country: string;
}

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

export interface Hair {
  /**
   * The hair color.
   *
   * @type {string}
   */
  color: string;
  /**
   * The hair type.
   *
   * @type {string}
   */
  type: string;
}