const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { validateEmail } = require('../validators');
const randomstring = require('randomstring');

const authSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email jest wymagany'],
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validateEmail, 'Nieprawidłowy email']   
    },
    password: {
        type: String,
        required: [true, 'Hasło jest wymagane'],
        minLength: [4, 'Hasło powinno posiadać minimum 4 znaki']
    },
    firstName: String,
    lastName: String,
    apiToken: String
});

//hash password
authSchema.pre('save', function (next) {
    const auth = this;
    if (!auth.isModified('password')) return next();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(auth.password, salt);
    auth.password = hash;
    next();
});

//middleware unique email
authSchema.post('save', function(error, doc, next) {
    if (error.code === 11000) {
        error.errors = {email: {message: 'Taki email jest już zarejestrowany'}};
    }
    next(error);
});

authSchema.pre('save', function (next) {
    const auth = this;
    if ( auth.isNew ) {
        auth.apiToken = randomstring.generate(20);
    }
    next();
});

//methods
authSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

authSchema.virtual('fullName').get(function() {
    if (this.firstName && this.lastName) {
        return `${this.firstName} ${this.lastName[0]}.`;
    }
});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;