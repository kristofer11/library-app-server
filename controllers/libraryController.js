const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Library = require('../models/libraryModel');

//GET A BOOK FROM LIBRARY
// GET /api/library/:id/books/:bookId
const getBookFromLibrary = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const bookId = req.params.bookId;

    let library = await Library.findOne({ user: userId });

    if (!library) {
        res.status(404);
        throw new Error('Library not found');
    }

    const book = library.books.find(book => book._id.toString() === bookId);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    res.json(book);
});

// ADD A BOOK TO LIBRARY
// POST /api/library/:id/books
const addBookToLibrary = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const { title, author, rating, review } = req.body;

    let library = await Library.findOne({ user: userId });

    if (!library) {
        library = await Library.create({ user: userId});
    }

    const newBook = {
        title,
        author,
        rating,
        review
    }

    library.books.push(newBook);

    await library.save();

    res.status(201).json({
        message: 'Book added to library'
    });
});

// UPDATE A BOOK IN LIBRARY
// PUT /api/library/:id/books/:bookId
const updateBookInLibrary = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const bookId = req.params.bookId;

    const { title, author, rating, review } = req.body;

    let library = await Library.findOne({ user: userId });

    if (!library) {
        res.status(404);
        throw new Error('Library not found');
    }

    const book = library.books.find(book => book._id.toString() === bookId);

    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.rating = rating || book.rating;
    book.review = review || book.review;

    await library.save();

    res.json({message: 'Book updated'});
});

// REMOVE A BOOK FROM LIBRARY
// DELETE /api/library/:id/books/:bookId
const removeBookFromLibrary = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const bookId = req.params.bookId;

    let library = await Library.findOne({ user: userId });

    if (!library) {
        res.status(404);
        throw new Error('Library not found');
    }

    const bookIndex = library.books.findIndex(book => book._id.toString() === bookId);

    if (bookIndex === -1) {
        res.status(404);
        throw new Error('Book not found');
    }

    library.books.splice(bookIndex, 1);

    await library.save();

    res.json({message: 'Book removed from library'});
});

// DROP LIBRARY
// DELETE /api/library/:id
const dropLibrary = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    let library = await Library.findOne({ user: userId });

    if (!library) {
        res.status(404);
        throw new Error('Library not found');
    }

    await library.deleteOne();

    res.json({message: 'Library dropped'});
});


module.exports = {
    getBookFromLibrary,
    addBookToLibrary,
    updateBookInLibrary,
    removeBookFromLibrary,
    dropLibrary
}