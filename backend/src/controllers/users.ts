import { Request, Response } from 'express';
import sql from 'mssql/msnodesqlv8';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const result = await request.query<User[]>(`
            SELECT * FROM Users
        `);

        const users: User[] = result.recordset;
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

export const getUserByName = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { name } = req.params;

        const result = await request.query<User>(`
            SELECT * FROM Users WHERE name = '${name}'
        `);

        const user: User = result.recordset[0];
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
}


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const user = req.body;

        // Check if the user name already exists (case-insensitive)
        const checkQuery = `SELECT 1 FROM Users WHERE LOWER(name) = LOWER('${user.name}')`;
        const checkResult = await request.query(checkQuery);

        if (checkResult.recordset.length > 0) {
            // User name already exists, return an error
            res.status(400).json({ message: 'User name already exists' });
            return;
        }

        const date = new Date();

        const result = await request.query<User>(`
        INSERT INTO Users (name, email, password, createdAt)
        OUTPUT INSERTED.*
        VALUES ('${user.name}', '${user.email}', '${user.password}', '${date.toISOString()}')
        `);

        const newUser: User = result.recordset[0];
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;
        const user = req.body;

        const updatedFields: string[] = [];

        if (user.name) updatedFields.push(`name = '${user.name}'`);
        if (user.password) updatedFields.push(`password = '${user.password}'`);
        if (user.email) updatedFields.push(`email = '${user.email}'`);
        if (user.image) updatedFields.push(`image = '${user.image}'`);

        const setClause = updatedFields.join(', ');

        const result = await request.query<User>(`
            UPDATE Users
            SET ${setClause}
            OUTPUT INSERTED.*
            WHERE id = ${id}
        `);

        const updatedUser: User = result.recordset[0];
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const connection = req.app.locals.db;
        const request = new sql.Request(connection);

        const { id } = req.params;

        // Delete the user's favorites first
        await request.query(`
        DELETE FROM Favorites
        WHERE user_id = ${id}
        `);

        // Delete the user
        await request.query<User>(`
            DELETE FROM Users
            OUTPUT DELETED.*
            WHERE id = ${id}
        `);

        res.json({ message: 'User deleted' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}