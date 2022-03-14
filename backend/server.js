// dependencies - publics
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Custom modules
const usersRoutes = require('./routes/usersRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const pollsRoutes = require('./routes/pollsRoutes');
const authenticationMW = require('../middlewares/authenticationMW');

require('dotenv').config();

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
app.use('/api/protected', authenticationMW, protectedRoutes);
app.use('/api/polls',authenticationMW,  pollsRoutes);

// app.get("/", (req, res , next)=>{
//        const newPoll = new PollsModel({
//            _id: ObjectId(),
//            title: "Test Poll",
//            start_date: new Date();
//            end_date: new Date();
//            target_date: new Date();
//        })
// })

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