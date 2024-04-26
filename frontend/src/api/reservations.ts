import axios from "axios";
import { useCallback } from "react";
import { Reservation } from "../interfaces";

// Base URL
const baseURL = import.meta.env.VITE_SERVER_URL;

const useReservations = () => {

    const getReservationsByUser = useCallback(async (user_id: number): Promise<Reservation[]> => {
        try {
            const { data } = await axios.get(`${baseURL}/api/reservations/user/${user_id}`);
            return data;
        } catch (error) {
            console.error("Error fetching reservations:", error);
            throw error;
        }
    }, []);

    const getReservationsByRestaurantByDate = useCallback(async (restaurant_id: number, date: string): Promise<Reservation[]> => {
        try {
            const { data } = await axios.get(`${baseURL}/api/reservations/restaurant/${restaurant_id}/${date}`);
            return data;
        } catch (error) {
            console.error("Error fetching reservations:", error);
            throw error;
        }
    }, []);

    const createReservation = useCallback(async (reservation: Reservation): Promise<Reservation> => {
        try {
            const { data } = await axios.post(`${baseURL}/api/reservations`, reservation);
            return data;
        } catch (error) {
            console.error("Error creating reservation:", error);
            throw error;
        }
    }, []);

    const deleteReservation = useCallback(async (id: number): Promise<void> => {
        try {
            await axios.delete(`${baseURL}/api/reservations/${id}`);
        } catch (error) {
            console.error("Error deleting reservation:", error);
            throw error;
        }
    }, []);

    return { 
        getReservationsByUser, 
        getReservationsByRestaurantByDate,
        createReservation,
        deleteReservation
    };
};

export default useReservations;