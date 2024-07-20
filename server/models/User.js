const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    year: {
        type: Number
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
