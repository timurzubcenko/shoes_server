const { Schema, model } = require('mongoose')

const schema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    discount: {
        type: String,
    },
    sizes: {
        type: Array,
        required: true,
        default: []
    },
    selectedSize: {
        type: String,
    },
    amount: {
        type: Number,
    },
    gender: {
        type: String,
        required: true
    },
    img1: {
        type: String,
    },
    img2: {
        type: String,
    },
    img3: {
        type: String,
    },
    img4: {
        type: String,
    },
})

module.exports = model('Product', schema)