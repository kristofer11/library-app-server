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

app.use(cors());

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));

app.use('/api/library', require('./routes/libraryRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));