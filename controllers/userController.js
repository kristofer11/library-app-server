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
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }

});

// AUTHENTICATE A USER
// POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    //Check for user email

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials');
    }
});

// UPDATE USER DATA
// PUT /api/users/me
// Private route
const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if(user) {
        user.name = name || user.name;
        user.email = email || user.email;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await user.save();
        res.status(201).json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found');
    }

});

// GET USER DATA 
// GET /api/users/me
// Private route
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    });
});

//Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '31d'
    })
}

module.exports = {
    getMe,
    loginUser,
    registerUser,
    updateUser
};