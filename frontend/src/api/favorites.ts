import axios from "axios";
import { useCallback } from "react";
import { Favorite, Restaurant } from "../interfaces";

// Base URL
const baseURL = import.meta.env.VITE_SERVER_URL;

const useFavorites = () => {

    const getFavorites = useCallback(async (user_id: number): Promise<Restaurant[]> => {
        try {
            const { data } = await axios.get(`${baseURL}/api/favorites/${user_id}`);
            return data;

        } catch (error) {
            console.error("Error fetching favorites:", error);
            throw error;
        }
    }, []);

    const deleteFavorite = useCallback(async (user_id: number, restaurant_id: number): Promise<void> => {
        try {
            await axios.delete(`${baseURL}/api/favorites/${user_id}/${restaurant_id}`);
        } catch (error) {
            console.error("Error deleting favorite:", error);
            throw error;
        }
    }, []);

    return { getFavorites, deleteFavorite };
};

export default useFavorites;