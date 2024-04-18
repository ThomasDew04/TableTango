export interface Restaurant {
    ID: number;
    name: string;
    cuisine: string;
    address: string;
    pricerange: number;
    openinghours: string;
    description: string;
    images: string;
}

export interface User {
    ID?: number;
    name: string;
    email: string;
    password: string;
}