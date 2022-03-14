// dependencies
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// instantiations
const app = express();

//config
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoDB = 'mongodb://172.31.192.1/homework13';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//routes
app.use('/api/users', usersRoutes);
app.use('/api/protected', protectedRoutes);


app.all('*', (req, res, next) => {
    res.status(404);
    return next(new Error('404 No route found'));
});

// error handler
app.use((err, req, res, next) => {
    return res.status(400).json({ success: false, message: err.message });
});

// Boot up
const port = app.get('port');
app.listen(port, 'localhost', () => console.log(`Listening on port ${port}`));