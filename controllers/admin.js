exports.getHomePage = (req, res, next) => {
    res.render('admin/home', {
        path: '/admin'
    });
}