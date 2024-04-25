// Define the interface for the reservation entity
interface Reservation {
    reservation_id: number;
    user_id: number;
    restaurant_id: number;
    timeslot_id: number;
    reservation_datetime: Date;
    num_guests: number;
    name: string;
    phone: string;
    image? : string;
    restaurant_name?: string;
    restaurant_address?: string;
    restaurant_cuisine?: string;
}

export default Reservation;