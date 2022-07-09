import { createItem } from 'server/database/utils';
import log from 'server/utils/logger';

describe('dbUtils tests', () => {
    const spy = jest.spyOn(log, 'info');
    it('should successfully create and return item', async () => {
        const model = {
            create: jest.fn(args => Promise.resolve(args))
        };
        const args = { description: 'Get Egg from grocery store!' };
        const item = await createItem(model, args);
        expect(model.create).toBeCalledWith(args);
        expect(item).toEqual(args);
    });

    it('should fail and throw error', async () => {
        const error = new Error('unable to create item');
        const model = {
            create: jest.fn(() => {
                throw error;
            })
        };
        await expect(() => createItem(model)).rejects.toThrow(error);
        expect(spy).toHaveBeenCalledWith({ err: error });
    });
});
