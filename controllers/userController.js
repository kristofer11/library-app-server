const asyncHandler = require('express-async-handler');

// REGISTER A USER
// POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Success (registerUser)'});
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