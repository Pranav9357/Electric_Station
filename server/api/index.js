import {createTodoRequest} from "./todo";
import express from "express";
import {model} from "database/model/todo";
import {UserApi} from './userApi'
import { ProviderApi } from "./providerApi";

export default app => {
    const router = express.Router()

    createTodoRequest({router, model})
    UserApi({router})
    ProviderApi({router})

    app.use('/todo', router)
    app.use('/user', router)
    app.use('/provider', router)
}