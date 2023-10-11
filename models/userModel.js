const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4, 
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, 'Please add a password'],
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);