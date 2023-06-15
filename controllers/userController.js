const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');


// REGISTER A USER
// POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill all the fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }

});

// AUTHENTICATE A USER
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Success (loginUser)'});
});

// GET USER DATA 
// GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Success (getMe)'});
});

module.exports = {
    getMe,
    loginUser,
    registerUser
};