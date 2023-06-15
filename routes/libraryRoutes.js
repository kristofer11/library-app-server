const express = require('express');
const router = express.Router();
const { 
    getBookFromLibrary,
    addBookToLibrary, 
    updateBookInLibrary,
    removeBookFromLibrary 
} = require('../controllers/libraryController');
const {protect} = require('../middleware/authMiddleware');

router.get('/:id/books/:bookId', protect, getBookFromLibrary);
router.put('/:id/books/:bookId', protect, updateBookInLibrary);
router.post('/:id/books', protect, addBookToLibrary);
router.delete('/:id/books/:bookId', protect, removeBookFromLibrary);

module.exports = router;