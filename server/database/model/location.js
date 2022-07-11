import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [],
        index: "2dsphere"
    }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = {
    model: Location,
    schema: locationSchema
}