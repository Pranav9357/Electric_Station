import supertest from 'supertest';
import app from 'server';
import * as daos from 'server/database/utils';
import { mockCreateTodoData } from 'server/utils/mockData';
import { waitFor } from '@babel/core/lib/gensync-utils/async';

describe('Todo tests', () => {
    it('should call the create todo api', async () => {
        jest.spyOn(daos, 'createItem').mockResolvedValueOnce(
            mockCreateTodoData
        );
        const res = await supertest(app)
            .post('/todo')
            .send({
                description: 'Get Egg from grocery store!'
            });
        expect(res.status).toEqual(200);
        expect(res.body.data).toEqual(mockCreateTodoData);
    });

    it('should call the create todo apo and throw error', async () => {
        const res = await supertest(app)
            .post('/todo')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(JSON.stringify(res.body.error)).toContain('must be present');
    });
});
