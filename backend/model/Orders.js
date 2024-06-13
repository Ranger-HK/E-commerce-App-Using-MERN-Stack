const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    itemCode: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Orders',OrderSchema);