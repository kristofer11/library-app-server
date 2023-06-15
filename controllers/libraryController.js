const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Library = require('../models/libraryModel');

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

module.exports = {
    addBookToLibrary
}