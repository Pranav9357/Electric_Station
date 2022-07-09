import mongoose from 'mongoose'

const providerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    noOfStation: {
        type: Number,
        required: true
    }
})

const Provider = mongoose.model('Provider', providerSchema)

module.exports = Provider