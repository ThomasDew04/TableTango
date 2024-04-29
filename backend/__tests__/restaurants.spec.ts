import request from 'supertest';
import app from '../src/app';
import { connectToDatabase } from '../src/database';
import { num } from 'envalid';

describe('Restaurant API endpoints', () => {

    beforeAll(async () => {
        await connectToDatabase();
      });

    it('GET /api/restaurants should return a list of restaurants', async () => {
        const response = await request(app).get('/api/restaurants');
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);

        // Check for fields
        response.body.forEach((restaurant: any) => {
            expect(restaurant).toHaveProperty('ID');
            expect(restaurant).toHaveProperty('name');
        });
    })

    it('POST /api/restaurants/ should create a new restaurant, then update and delete it', async () => {
        let createdRestaurant; // Variable to store the created restaurant data
    
        // Create a new restaurant
        const createResponse = await request(app)
            .post('/api/restaurants')
            .send({
                name: 'testrestaurant',
                cuisine: 'testcuisine',
                address: 'testlocation',
                pricerange: 5,
                openinghours: 'testhours',
                description: 'testdescription',
                images: 'testimages',
                num_tables: 5
            });
    
        // Extract relevant data from the create response
        createdRestaurant = createResponse.body;
    
        // Assertions for the create test
        expect(createResponse.status).toEqual(201);
        expect(createdRestaurant).toHaveProperty('name', 'testrestaurant');
        expect(createdRestaurant).toHaveProperty('cuisine', 'testcuisine');
        expect(createdRestaurant).toHaveProperty('address', 'testlocation');
        expect(createdRestaurant).toHaveProperty('pricerange', 5);
    
        // Update the created restaurant
        const updateResponse = await request(app)
            .put(`/api/restaurants/${createdRestaurant.ID}`)
            .send({
                name: 'updatedrestaurant',
                cuisine: 'updatedcuisine',
                address: 'updatedlocation',
                pricerange: 10,
                openinghours: 'updatedhours',
                description: 'updateddescription',
                images: 'updatedimages',
                num_tables: 10
            });
    
        // Assertions for the update test
        expect(updateResponse.status).toEqual(200);
        expect(updateResponse.body).toHaveProperty('name', 'updatedrestaurant');
        expect(updateResponse.body).toHaveProperty('cuisine', 'updatedcuisine');
        expect(updateResponse.body).toHaveProperty('address', 'updatedlocation');
        expect(updateResponse.body).toHaveProperty('pricerange', 10);
    
        // Delete the created restaurant
        const deleteResponse = await request(app).delete(`/api/restaurants/${createdRestaurant.ID}`);
    
        // Assertions for the delete test
        expect(deleteResponse.status).toEqual(200);
        expect(deleteResponse.body).toHaveProperty('message', 'Restaurant deleted');
    });
    
})