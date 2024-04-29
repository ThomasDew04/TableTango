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

    it('GET /api/users/:name should return a user by name', async () => {
        const response = await request(app).get('/api/users/test');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('ID');
        expect(response.body).toHaveProperty('name');
    })

    it('POST /api/users should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({
                name: 'testuser',
                email: 'testmail',
                password: 'testpass'
            });
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('password');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('resvMade', 0);
    }, 5000)

    it('PUT /api/users/:id should update a user', async () => {
        const data = await request(app).get('/api/users/testuser');
        const user = data.body;

        const response = await request(app)
            .put(`/api/users/${user.ID}`)
            .send({
                name: 'testuser2'
            });
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('name', 'testuser2');
    })

    it('DELETE /api/users/:id should delete a user', async () => {
        const data = await request(app).get('/api/users/testuser2');
        const user = data.body;

        const response = await request(app).delete(`/api/users/${user.ID}`);
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('message', 'User deleted');
    })

})