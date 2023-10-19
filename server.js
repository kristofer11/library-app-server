const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const colors = require('colors');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors({
    origin:
        [
            // original frontend
            'https://library-manager-hpluf2ll1-kristofer11.vercel.app',
            'https://library-manager-gamma.vercel.app',
            'http://localhost:3000',
            'http://localhost:5174',
            'http://localhost:5173',
            // new frontend as of 10/18/23
            'library-seven-mu.vercel.app',
            'library-git-main-kristofer11.vercel.app',
            'library-qivp1qves-kristofer11.vercel.app',
            'library-3b8pgwus2-kristofer11.vercel.app',
            '*'
        ]
}));

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/library', require('./routes/libraryRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));