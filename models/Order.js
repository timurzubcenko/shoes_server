const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: {
        type: Array,
        ref: 'Product'
    },
    totalPrice: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true
    }
})

module.exports = model('Order', schema)