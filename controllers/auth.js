exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: "/login"
    });
};

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        path: "/signup"
    });
};
