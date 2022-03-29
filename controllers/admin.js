exports.getHomePage = (req, res, next) => {
    res.render('admin/home', {
        path: '/admin',
        user: req.user, 
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.getAddEmployee = (req, res, next) => {
    res.render('admin/add-employee', {
        path: '/admin/add-employee', 
        user: req.user,
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.getManageBookings = (req, res, next) => {
    res.render('admin/manage-bookings', {
        path: '/admin/manage-bookings', 
        user: req.user,
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.getLayout = (req, res, next) => {
    res.render('admin/layouts', {
        path: '/admin/layouts', 
        user: req.user, 
        isLoggedIn: req.session.isLoggedIn
    });
};

exports.getAddRoom = (req, res, next) => {
    res.render('admin/add-room', {
        path: '/admin/add-room', 
        user: req.user, 
        isLoggedIn: req.session.isLoggedIn
    });
}