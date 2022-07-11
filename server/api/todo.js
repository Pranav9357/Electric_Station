import { createItem } from '../database/utils';
import { apiFailure, apiSuccess } from '../utils/apiUtils';

export const createTodoRequest = ({ router, model }) => {
    router.post('/', async (req, res) => {
        try {
            const item = await createItem(model, req.body);
            return apiSuccess(res, item);
        } catch (err) {
            return apiFailure(res, err.message);
        }
    });
};
