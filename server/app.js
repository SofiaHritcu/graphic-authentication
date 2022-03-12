const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// initialize the app
const app = express();

// middlewares

// form data middleware
app.use(bodyParser.urlencoded({
    extended: false,
}));

// json body middleware
app.use(bodyParser.json());

// cors middleware
app.use(cors());

// setting up the static directory static directory
app.use(express.static(path.join(__dirname, 'public')));

// bring in the database configs and connect to the db
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { 
    useNewUrlParser: true 
}).then(() => {
    console.log('Database connected successfully!');
}).catch(err => {
    console.log('Unable to connect to the database!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
