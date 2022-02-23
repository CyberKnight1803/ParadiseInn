exports.getLogin = (req, res, next) => {
    res.render('auth/login');
};

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup');
};
