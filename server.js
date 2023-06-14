const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

const app = express();

app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => console.log(`Server running on port ${port}`));