import supertest from 'supertest';
import app from 'server';
import { mockCreateUserData } from 'server/utils/mockData';
import { User } from 'database/model/User';

describe('UserAPi tests', () => {
    describe('getAllUser userApi', () => {
        it('response with json', async () => {
            const res = await supertest(app).get('/user/allUser');
            expect(res.statusCode).toEqual(200);
            expect(JSON.stringify(res.body.response)).toContain('')
        });

        it('throw error', async () => {
            const res = await supertest(app).get('/user/allUser');
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });

    describe('addUser userAPi', () => {
        it('post request', async () => {
            const res = await supertest(app).post('/user/addUser').send({
                name: 'amin'
            });
            expect(res.status).toEqual(200);
            expect(res.body.data).toEqual(mockCreateUserData);
        });

        it('throw error', async () => {
            const res = await supertest(app).post('/user/addUser').send({});
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });

    describe('updateUser userApi', async () => {
        const id = await User.findOne({});
        it('put request', async () => {
            const res = await supertest(app).put(`/user/${id}`).send({
                name: 'aakash'
            });
            expect(res.statusCode).toEqual(200);
        });

        it('throw error', async () => {
            const res = await supertest(app).put(`/user/${id}`).send({});
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });

    describe('deleteUser userAPi', async () => {
        const id = await User.findOne({});
        it('delete request', async () => {
            const res = await supertest(app).delete(`/user/${id}`);
            expect(res.statusCode).toEqual(200);
        });

        it('throw error', async () => {
            const res = await supertest(app).post(`/user/${id}`);
            expect(res.statusCode).toEqual(400);
            expect(JSON.stringify(res.body.err)).toContain('error Occured');
        });
    });
});
