import { CreateResourceDTO } from '@/modules/resource/dtos';
import mongoose from 'mongoose';
import request from 'supertest';
import { App } from '../../app';

describe('Resource API', () => {
    let app: App;

    beforeAll(async () => {
        app = new App();
        await app.start();
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('POST /api/v1/resources', () => {
        it('should create a new resource', async () => {
            const resourceData: CreateResourceDTO = {
                name: 'Test Resource',
                description: 'Test Description',
            };

            const response = await request(app.getServer())
                .post('/api/v1/resources')
                .send(resourceData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(resourceData.name);
            expect(response.body.description).toBe(resourceData.description);
        });

        it('should return validation error for invalid data', async () => {
            const invalidData = {
                name: '',
                description: '',
            };

            const response = await request(app.getServer())
                .post('/api/v1/resources')
                .send(invalidData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });
});
