import { Request, Response } from 'express';
import sql from 'mssql/msnodesqlv8';
import Favorite from '../models/favorite';
import { Restaurant } from '../models/restaurant';

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query<Restaurant[]>(`
            SELECT Restaurants.*
            FROM Favorites
            JOIN Restaurants ON Favorites.restaurant_id = Restaurants.ID 
            WHERE user_id = ${id}
        `);

        const favorites: Restaurant[] = result.recordset;
        res.json(favorites);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving favorites', error: error.message });
    }
};

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const favorite = req.body as Favorite;

        const result = await request.query<Favorite>(`
            INSERT INTO Favorites (user_id, restaurant_id)
            OUTPUT INSERTED.*
            VALUES (${favorite.user_id}, ${favorite.restaurant_id})
        `);

        const newFavorite: Favorite = result.recordset[0];
        res.status(201).json(newFavorite);
    } catch (error: any) {
        res.status(500).json({ message: 'Error adding favorite', error: error.message });
    }
};

export const deleteFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { user_id, restaurant_id } = req.params;

        // Delete the favorite
        const result = await request.query(`
            DELETE FROM Favorites
            OUTPUT DELETED.*
            WHERE user_id = ${user_id} AND restaurant_id = ${restaurant_id}
        `);

        // Check if any favorite was deleted
        if (result.recordset[0] !== undefined) {
            res.status(200).json({ message: 'Favorite deleted' });
        } else {
            res.status(404).json({ message: 'Favorite not found' });
        }

    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting favorite', error: error.message });
    }
};