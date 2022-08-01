module.exports = function (req, res, next) {
    res.locals.auth = req.session.auth;
    next();
}