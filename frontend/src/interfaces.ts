export interface Restaurant {
    ID: number;
    name: string;
    cuisine: string;
    address: string;
    pricerange: number;
    openinghours: string;
    description: string;
    images: string;
    num_tables: number;
}

export interface User {
    ID?: number;
    name: string;
    email: string;
    password: string;
    image?: string;
    createdAt: string;
    resvMade: number;
}

export interface Favorite {
    user_id: number;
    restaurant_id: number;
}

export interface Reservation {
    reservation_id?: number;
    user_id: number;
    restaurant_id: number;
    timeslot_id: number;
    reservation_datetime: Date;
    num_guests: number;
    name: string;
    phone: string;
    images? : string;
    restaurant_name?: string;
    address?: string;
    cuisine?: string;
}

export interface Timeslot {
    timeslot_id: number;
    restaurant_id: number;
    start_time: string;
}