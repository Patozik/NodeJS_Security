const Auth = require('../db/models/auth');

class AuthController {

    showRegister (req, res) {
        res.render('pages/auth/register');
    }

    async register (req, res) {

        const auth = new Auth({
            email: req.body.email,
            password: req.body.password
        });

        try {
            await auth.save();
            res.redirect('/');
        } catch (err) {
            res.render('pages/auth/register', {
                errors: err.errors,
                form: req.body
            });
        }
    }

    showLogin (req, res) {
        res.render('pages/auth/login');
    }

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
        req.session.auth = auth;
        res.redirect('/');

        } catch (err) {
            return res.render('pages/auth/login', {
                form: req.body,
                errors: true
            });
        }
    }

    logout (req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    showProfile (req, res) {
        res.render('pages/auth/profile',{
            form: req.session.auth
        });
    }

    async update (req, res) {
        const auth = await Auth.findById(req.session.auth._id);
        auth.email = req.body.email;
        auth.firstName = req.body.firstName;
        auth.lastName = req.body.lastName;


        if (req.body.password) {
            auth.password = req.body.password;
        }

        try {
            await auth.save();
            req.session.auth = auth;
            res.render('pages/auth/profile', {
                success: true,
                form: req.body
            });
        } catch (err) {
            res.render('pages/auth/profile', {
                errors: err.errors,
                form: req.body
            });
        }
    }

}

module.exports = new AuthController;