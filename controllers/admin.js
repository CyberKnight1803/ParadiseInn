exports.getHomePage = (req, res, next) => {
    res.render('admin/home', {
        path: '/admin',
        user: req.user
    });
};

exports.getAddEmployee = (req, res, next) => {
    res.render('admin/add-employee', {
        path: '/admin/add-employee', 
        user: req.user
    });
};

exports.getManageBookings = (req, res, next) => {
    res.render('admin/manage-bookings', {
        path: '/admin/manage-bookings', 
        user: req.user
    });
};

exports.getLayout = (req, res, next) => {
    res.render('admin/layouts', {
        path: '/admin/layouts', 
        user: req.user
    });
};