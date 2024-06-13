const mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    qtyOnHand: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Item',ItemSchema);