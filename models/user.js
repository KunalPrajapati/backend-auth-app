const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    role: {
        type: String,
        enum: ['Student', 'Admin', 'Visitor'],  // enum means string objects are allowed with these values only for admin and user role
    }

});

module.exports = mongoose.model('user', userSchema);
