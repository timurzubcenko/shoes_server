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
    password: {
        type: String,
        required: true,
    },
    products: [{
        type: Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = model('User', schema)