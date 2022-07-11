import supertest from 'supertest';
import app from 'server';
import { mockCreateProviderData } from 'server/utils/mockData';
import { Provider } from 'database/model/provider';

describe('UserAPi tests', () => {
    describe('getAllUser userApi', () => {
        it('response with json', async () => {
            const res = await supertest(app).get('/provider/allProvider');
            expect(res.statusCode).toEqual(200);
        });

        it('throw error', async () => {
            const res = await supertest(app).get('/provider/allProvider');
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });

    describe('addUser userAPi', () => {
        it('post request', async () => {
            const res = await supertest(app)
                .post('/provider/addProvider')
                .send({
                    name: 'harsh'
                });
            expect(res.status).toEqual(200);
            expect(res.body.data).toEqual(mockCreateProviderData);
        });

        it('throw error', async () => {
            const res = await supertest(app)
                .post('/provider/addProvider')
                .send({});
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });

    describe('updateUser userApi', async () => {
        const id = await Provider.findOne({});
        it('put request', async () => {
            const res = await supertest(app).put(`/provider/${id}`).send({
                name: 'jay'
            });
            expect(res.statusCode).toEqual(200);
        });

        it('throw error', async () => {
            const res = await supertest(app).put(`/provider/${id}`).send({});
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });

    describe('deleteUser userAPi', async () => {
        const id = await Provider.findOne({});
        it('delete request', async () => {
            const res = await supertest(app).delete(`/provider/${id}`);
            expect(res.statusCode).toEqual(200);
        });

        it('throw error', async () => {
            const res = await supertest(app).post(`/provider/${id}`);
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });
});
