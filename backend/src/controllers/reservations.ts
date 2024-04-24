import { Request, Response } from 'express';
import sql from 'mssql/msnodesqlv8';
import Reservation from '../models/reservation';

export const getReservationsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query<Reservation[]>(`
            SELECT r.*, res.images
            FROM reservations AS r
            JOIN Users as u on r.user_id = u.ID
            JOIN Restaurants as res on r.restaurant_id = res.ID
            WHERE user_id = ${id}
        `);

        const reservations: Reservation[] = result.recordset;
        res.json(reservations);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
};

export const getReservationsByRestaurantByDate = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { restaurant_id, date } = req.params;

        const result = await request.query<Reservation[]>(`
            SELECT r.*
            FROM reservations AS r
            WHERE r.restaurant_id =${restaurant_id}
            AND CONVERT(DATE, r.reservation_datetime) = '${date}';
        `);

        const reservations: Reservation[] = result.recordset;
        res.json(reservations);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
}