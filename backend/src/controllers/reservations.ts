import { Request, Response } from 'express';
import sql from 'mssql/msnodesqlv8';
import Reservation from '../models/reservation';

export const getReservationsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query<Reservation[]>(`
            SELECT r.*, res.images, res.name as restaurant_name, res.address, res.cuisine
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

export const createReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const reservation: Reservation = req.body;

        const result = await request.query(`
            INSERT INTO reservations (user_id, restaurant_id, timeslot_id, reservation_datetime, num_guests, name, phone_number)
            OUTPUT INSERTED.*
            VALUES (${reservation.user_id}, ${reservation.restaurant_id}, 
                ${reservation.timeslot_id}, '${reservation.reservation_datetime}', 
                ${reservation.num_guests}, '${reservation.name}', 
                '${reservation.phone}');
        `);

        const newReservation: Reservation = result.recordset[0];
        res.status(201).json(newReservation);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating reservation', error: error });
    }
};

export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        const result = await request.query(`
            DELETE FROM Reservations WHERE reservation_id = ${id};
        `);

        res.status(204).json({ message: 'Reservation deleted'});
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting reservation', error: error });
    }
};