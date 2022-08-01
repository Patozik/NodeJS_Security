module.exports = function (req, res, next) {
    if (!req.session.auth) {
        res.redirect('/zaloguj');
    }
    next();
}