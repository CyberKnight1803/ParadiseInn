const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, _next) => {
    res.render('auth/login', {
        path: "/login", 
        isLoggedIn: req.session.isLoggedIn, 
        user: req.user
    });
};

exports.postLogin = (req, res, _next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email
    })
    .then(user => {
        if (!user)
            return res.redirect('/login');
        
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if (doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;

                return req.session.save(err => {
                    if (err)
                        console.log(err);
                    res.redirect('/');
                });
            }
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        });
    });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err)
            console.log(err);
        res.redirect('/');
    });
};

exports.getSignUp = (req, res, _next) => {
    res.render('auth/signup', {
        path: "/signup",
        isLoggedIn: req.session.isLoggedIn, 
        user: req.user
    });
};

exports.postSignUp = (req, res, _next) => {
    const userName = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    console.log(userName, email, password);

    User.findOne({
        email: email
    }).then(user => {
        if (user){
            return res.redirect('/login');    // if user already exists
        }

        if (password.toString() === confirmPassword.toString()){
            return bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    name: userName, 
                    email: email, 
                    password: hashedPassword
                });

                return user.save();
            })
            .then(_result => {
                console.log("USER CREATED !");
                res.redirect('/login');
            });
        }
        return res.redirect('/signup');
    })
    .catch(err => console.log(err));
};