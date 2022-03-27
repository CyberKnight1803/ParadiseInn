const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const constants = require('./utils/constants');

// Routes
const hotelRoutes = require('./routes/hotel');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Controllers
const errorController = require('./controllers/error');
const user = require('./models/user');

const app = express();
const store = new MongoDBStore({
    uri: constants.MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mySecret', 
    resave: false, 
    saveUninitialized: false, 
    store:store
}));

app.use((req, _res, next) => {
    if (!req.session.user){
        return next();
    }

    user.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(hotelRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose.connect(constants.MONGODB_URI)
.then(_result => {
    console.log("Database Connected!");
    app.listen(constants.PORT);
})
.catch(err => console.log(err));
