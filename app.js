const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const mongoose = require('mongoose');

const constants = require('./utils/constants');

// Routes
const hotelRoutes = require('./routes/hotel');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Controllers
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res, next) => {
//     res.render('hotel/home');
// });

app.use('/admin', adminRoutes);
app.use(hotelRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose.connect(constants.MONGODB_URI)
.then(result => {
    console.log("Database Connected!");
    app.listen(constants.PORT);
})
.catch(err => console.log(err));
