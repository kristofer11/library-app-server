const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
    },
    author: {
        type: String,
        required: [true, 'Please enter an author'],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        required: [true, 'Please enter a rating'],
    },
    review: {
        type: String,
        required: [false, 'Please enter a review'],
    },
    img: {
        type: String,
        required: true
    }
})

const librarySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    books: [bookSchema]
});

module.exports = mongoose.model('Library', librarySchema);