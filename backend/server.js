// dependencies - publics
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

// Custom modules
const usersRoutes = require('./routes/usersRoutes');
const pollsRoutes = require('./routes/pollsRoutes');
const foodsRoutes = require('./routes/foodsroutes');
const authenticationMW = require('./middlewares/authenticationMW');
const {pollController} = require("./controllers/pollsController");

require('dotenv').config();
const { generateUser } = require('./controllers/sharedControllers');
// instantiations
const app = express();

//config
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoDB = 'mongodb://localhost:/project';
mongoose.connect(process.env.HOST || mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//routes

app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/polls',  pollsRoutes);
app.use('/api/foods', foodsRoutes);

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
app.listen(port, 'localhost', async () => {
    console.log(`Listening on port ${port}`);
    console.log('generating default users');
    await generateUser();
});