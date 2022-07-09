import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    }
});

const todoModel = mongoose.model('todo', todoSchema)

module.exports = {
    model: todoModel,
    schema: todoSchema
}