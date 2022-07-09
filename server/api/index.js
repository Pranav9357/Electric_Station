import {createTodoRequest} from "./todo";
import express from "express";
import {model} from "database/model/todo";

export default app => {
    const router = express.Router()

    createTodoRequest({router, model})

    app.use('/todo', router)
}