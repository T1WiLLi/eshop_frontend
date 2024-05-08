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
        domain: data.domain,
        ip: data.ip,
        address: {
            address: data.address.address,
            city: data.address.city,
            postalCode: data.address.postalCode,
            state: data.address.state,
            coordinates: {
                lat: data.address.coordinates.lat,
                lng: data.address.coordinates.lng
            }
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
                }
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
        }
    };
}
    
export function formatProduct(data: any): Product {
    return {
        id: data.id,
        title: data.title,
        description: data.description,
        price: data.price,
        discountPercentage: data.discountPercentage,
        rating: data.rating,
        stock: data.stock,
        brand: data.brand,
        category: data.category,
        thumbnail: data.thumbnail,
        images: data.images
    };
}