import { Request, Response } from 'express';
import sql from 'mssql/msnodesqlv8';
import Restaurant from '../models/restaurant';

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const result = await request.query<Restaurant[]>(`
            SELECT * FROM Restaurants
        `);

        const restaurants: Restaurant[] = result.recordset;
        res.json(restaurants);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving restaurants', error: error.message });
    }
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query<Restaurant>(`
            SELECT * FROM Restaurants WHERE id = ${id}
        `);

        const restaurant: Restaurant = result.recordset[0];
        res.json(restaurant);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving restaurant', error: error.message });
    }
}

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { name, cuisine, address } = req.body;

        const result = await request.query<Restaurant>(`
            INSERT INTO Restaurants (name, cuisine, address)
            OUTPUT INSERTED.*
            VALUES ('${name}', '${cuisine}', '${address}')
        `);

        const restaurant: Restaurant = result.recordset[0];
        res.status(201).json(restaurant);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating restaurant', error: error.message });
    }
}

export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);
        const { id } = req.params;
        const { name, cuisine, address } = req.body;
        const updatedFields: string[] = [];

        if (name) updatedFields.push(`name = '${name}'`);
        if (cuisine) updatedFields.push(`cuisine = '${cuisine}'`);
        if (address) updatedFields.push(`address = '${address}'`);
        const setClause = updatedFields.join(', ');

        const result = await request.query<Restaurant>(`
            UPDATE Restaurants
            SET ${setClause}
            OUTPUT INSERTED.*
            WHERE id = ${id}
        `);

        const restaurant: Restaurant = result.recordset[0];
        res.json(restaurant);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating restaurant', error: error.message });
    }
}

export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query<Restaurant>(`
            DELETE FROM Restaurants
            OUTPUT DELETED.*
            WHERE id = ${id}
        `);

        const restaurant: Restaurant = result.recordset[0];
        res.json(restaurant);
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
    }
}
