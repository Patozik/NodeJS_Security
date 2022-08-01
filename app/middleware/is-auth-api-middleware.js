const Auth = require('../db/models/auth');

module.exports = async function (req, res, next) {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'Brak autoryzacji' });
    }

    const auth = await Auth.findOne({ apiToken: token });

    req.auth = auth;

    if (!auth) {
        res.status(403).json({ message: 'Brak autoryzacji' });
    }
    
    next();

}