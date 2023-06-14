const asyncHandler = require('express-async-handler');

//GET ALL USERS 
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('Success (getUserProfile)');
});

//REGISTER A USER
const registerUser = asyncHandler(async (req, res) => {
    res.send('Success (registerUser)');
});

module.exports = {
    getUserProfile,
    registerUser
};