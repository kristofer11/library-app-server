const express = require('express');
const router = express.Router();
const { 
    loginUser,
    getMe,
    registerUser,
    updateUser    
} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/me', protect, updateUser)
router.get('/me', protect, getMe );

module.exports = router;