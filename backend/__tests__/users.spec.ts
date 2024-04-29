import request from 'supertest';
import app from '../src/app';
import { connectToDatabase } from '../src/database';

describe('User API endpoints', () => {

    beforeAll(async () => {
        await connectToDatabase();
      });

    it('GET /api/users should return a list of users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);

        // Check for fields
        response.body.forEach((user: any) => {
            expect(user).toHaveProperty('ID');
            expect(user).toHaveProperty('name');
        });
    })
})