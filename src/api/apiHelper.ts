import { CartItem, Order } from "../interface/Orders";
import { Product } from "../interface/product";
import { User } from "../interface/user";

export function formatUser(data: any): User {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        maidenName: data.maidenName,
        age: data.age,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        username: data.username,
        password: data.password,
        birthDate: data.birthDate,
        image: data.image,
        bloodGroup: data.bloodGroup,
        height: data.height,
        weight: data.weight,
        eyeColor: data.eyeColor,
        hair: {
            color: data.hair.color,
            type: data.hair.type
        },
        ip: data.ip,
        address: {
            address: data.address.address,
            city: data.address.city,
            postalCode: data.address.postalCode,
            state: data.address.state,
            coordinates: {
                lat: data.address.coordinates.lat,
                lng: data.address.coordinates.lng
            },
            stateCode: data.address.stateCode,
            country: data.address.country
        },
        macAddress: data.macAddress,
        university: data.university,
        bank: {
            cardExpire: data.bank.cardExpire,
            cardNumber: data.bank.cardNumber,
            cardType: data.bank.cardType,
            currency: data.bank.currency,
            iban: data.bank.iban
        },
        company: {
            address: {
                address: data.company.address.address,
                city: data.company.address.city,
                postalCode: data.company.address.postalCode,
                state: data.company.address.state,
                coordinates: {
                    lat: data.company.address.coordinates.lat,
                    lng: data.company.address.coordinates.lng
                },
                stateCode: data.company.address.stateCode,
                country: data.company.address.country
            },
            department: data.company.department,
            name: data.company.name,
            title: data.company.title
        },
        ein: data.ein,
        ssn: data.ssn,
        userAgent: data.userAgent,
        crypto: {
            coin: data.crypto.coin,
            wallet: data.crypto.wallet,
            network: data.crypto.network
        },
        role: data.role
    };
}
    
export function formatProduct(data: any): Product {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.category,
    price: data.price,
    discountPercentage: data.discountPercentage,
    rating: data.rating,
    stock: data.stock,
    tags: data.tags,
    brand: data.brand,
    sku: data.sku,
    weight: data.weight,
    dimensions: data.dimensions,
    warrantyInformation: data.warrantyInformation,
    shippingInformation: data.shippingInformation,
    availabilityStatus: data.availabilityStatus,
    reviews: data.reviews,
    returnPolicy: data.returnPolicy,
    minimumOrderQuantity: data.minimumOrderQuantity,
    meta: data.meta,
    images: data.images,
    thumbnail: data.thumbnail,
  };
}

export function formatOrder(data: any): Order {
    console.log(data);
    const { id, products, userId } = data;
    let total = data.total;
    let discountedTotal = data.discountedTotal;
    let totalProducts = data.totalProducts;
    let totalQuantity = data.totalQuantity;

    products.forEach((product: CartItem) => {
        const { quantity } = product;
        totalProducts++;
        totalQuantity += quantity;
    });

    return {
        id,
        products,
        total,
        discountedTotal,
        userId,
        totalProducts,
        totalQuantity,
        purchaseDate: new Date().toISOString()
    };
}
