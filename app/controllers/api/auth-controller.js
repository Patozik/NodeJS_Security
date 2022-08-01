const Auth = require('../../db/models/auth');

class AuthController { 
    async login (req, res) {
        //check email
        try {
        const auth = await Auth.findOne({ email: req.body.email });
        if (!auth) {
            throw new Error('User not found');
        }

        //check password
        const isValidPassword = auth.comparePassword(req.body.password);
        if (!isValidPassword) {
            throw new Error('Password not valid');
        }

        //login
        res.status(200).json({ apiToken: auth.apiToken });

        } catch (err) {
            res.status(401).json({ errors: err.message });
        }
    }
}

module.exports = new AuthController();