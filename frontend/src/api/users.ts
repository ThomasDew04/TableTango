import axios from "axios";
import { useCallback } from "react";
import { User } from "../interfaces";

// Base URL
const baseURL = import.meta.env.VITE_SERVER_URL;

const useUsers = () => {

  const getAll = useCallback(async (): Promise<User[]> => {
    try {
      const { data } = await axios.get(`${baseURL}/api/users`);
      return data;

    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  }, []);

  const getByName = useCallback(async (name: string): Promise<User> => {
    try {
      const { data } = await axios.get(`${baseURL}/api/users/${name}`);
      return data;
    } catch (error) {
      console.error("Error fetching user by name:", error);
      throw error;
    }
  }, []);

  const create = useCallback(async (user: User): Promise<User> => {
    try {
        const { data } = await axios.post(`${baseURL}/api/users`, user);
        return data;
    } catch (error) {
        throw error;
    }
  }, []);

  const update = useCallback(async (user: User): Promise<User> => {
    try {
        const { data } = await axios.put(`${baseURL}/api/users/${user.ID}`, user);
        return data;
    } catch (error) {
        throw error;
    }
  }, []);

  return { getAll, getByName , create, update };
};

export default useUsers;