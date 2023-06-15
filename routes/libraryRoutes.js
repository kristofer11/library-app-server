const express = require('express');
const router = express.Router();
const { addBookToLibrary } = require('../controllers/libraryController');
const {protect} = require('../middleware/authMiddleware');

router.post('/:id/books', protect, addBookToLibrary);

module.exports = router;