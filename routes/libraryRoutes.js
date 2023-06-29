const express = require('express');
const router = express.Router();
const { 
    getBookFromLibrary,
    getAllBooksFromLibrary,
    addBookToLibrary, 
    updateBookInLibrary,
    removeBookFromLibrary,
    dropLibrary
} = require('../controllers/libraryController');
const {protect} = require('../middleware/authMiddleware');

router.get('/:id/books/:bookId', protect, getBookFromLibrary);
router.get('/:id/books', protect, getAllBooksFromLibrary);
router.put('/:id/books/:bookId', protect, updateBookInLibrary);
router.post('/:id/books', protect, addBookToLibrary);
router.delete('/:id/books/:bookId', protect, removeBookFromLibrary);
router.delete('/:id', protect, dropLibrary);

module.exports = router;