import axios from "axios";
import { useCallback } from "react";
import { Restaurant } from "../interfaces";

// Base URL
const baseURL = import.meta.env.VITE_SERVER_URL;

const useRestaurants = () => {

  const getAll = useCallback(async (): Promise<Restaurant[]> => {
    try {
      const { data } = await axios.get(`${baseURL}/api/restaurants`);
      return data;

    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  }, []);

  return { getAll };
};

export default useRestaurants;

