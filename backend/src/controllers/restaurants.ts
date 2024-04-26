import { Request, Response } from 'express';
import sql from 'mssql/msnodesqlv8';
import { Restaurant, Timeslot } from '../models/restaurant';

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

export const getTimeslotsByRestaurantId = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query<Timeslot[]>(`
            SELECT * FROM Timeslots WHERE restaurant_id = ${id}
        `);

        const timeslots: Timeslot[] = result.recordset;
        res.json(timeslots);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving timeslots', error: error.message });
    }
};

export const getAvailableRestaurantsByDate = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { date } = req.params;

        const result = await request.query<Restaurant[]>(`
        SELECT r.*
        FROM (
            SELECT 
                r.ID AS restaurant_id,
                r.name,
                r.num_tables,
                CASE WHEN r.num_tables * COUNT(DISTINCT t.timeslot_id) - COUNT(DISTINCT res.reservation_id) > 0 
                THEN 'true' ELSE 'false' END AS hasPlace
            FROM 
                Restaurants r
            LEFT JOIN 
                Timeslots t ON r.ID = t.restaurant_id
            LEFT JOIN 
                Reservations res ON t.timeslot_id = res.timeslot_id 
                AND r.ID = res.restaurant_id 
                AND CONVERT(DATE, res.reservation_datetime) = CONVERT(DATE, '${date}')
            GROUP BY 
                r.ID, r.name, r.num_tables
        ) AS subquery
        JOIN Restaurants r ON subquery.restaurant_id = r.ID
        WHERE hasPlace = 'true';
        `);

        const restaurants: Restaurant[] = result.recordset;
        res.json(restaurants);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving restaurants', error: error.message });
    }
};


export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { name, cuisine, address, pricerange, openinghours, description, images } = req.body;

        const result = await request.query<Restaurant>(`
            INSERT INTO Restaurants (name, cuisine, address, pricerange, openinghours, description, images)
            OUTPUT INSERTED.*
            VALUES ('${name}', '${cuisine}', '${address}', ${pricerange}, '${openinghours}', '${description}', '${images}')
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
        const { name, cuisine, address, pricerange, openinghours, description, images } = req.body;
        const updatedFields: string[] = [];

        if (name) updatedFields.push(`name = '${name}'`);
        if (cuisine) updatedFields.push(`cuisine = '${cuisine}'`);
        if (address) updatedFields.push(`address = '${address}'`);
        if (pricerange) updatedFields.push(`pricerange = ${pricerange}`);
        if (openinghours) updatedFields.push(`openinghours = '${openinghours}'`);
        if (description) updatedFields.push(`description = '${description}'`);
        if (images) updatedFields.push(`images = '${images}'`);

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
