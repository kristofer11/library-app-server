const express = require('express');
const router = express.Router();
const { 
    getUserProfile,     
    registerUser, 
    updateUserProfile     
} = require('../controllers/userController');

router.route('/').get(getUserProfile)
router.route('/').post(registerUser);

router.route('/login/').post(registerUser);

module.exports = router;