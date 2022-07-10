import { createTodoRequest } from './todo';
import express from 'express';
import { model } from 'database/model/todo';
import { UserRestApi } from './userRestApi';
import { ProviderRestApi } from './providerRestApi';
import { authentication } from '../utils/authentication';

export default app => {
    const router = express.Router();

    createTodoRequest({ router, model });
    UserRestApi({ router });
    ProviderRestApi({ router });

    app.use('/todo', router);
    app.use('/user', authentication, router);
    app.use('/provider', authentication, router);
};
