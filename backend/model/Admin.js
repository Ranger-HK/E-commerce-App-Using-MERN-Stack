const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin',AdminSchema);