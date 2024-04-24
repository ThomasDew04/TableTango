// Define the interface for the reservation entity
interface Reservation {
    reservation_id: number;
    user_id: number;
    restaurant_id: number;
    timeslot_id: number;
    date: Date;
    num_guests: number;
    name: string;
    phone: string;
    image? : string;
}

export default Reservation;