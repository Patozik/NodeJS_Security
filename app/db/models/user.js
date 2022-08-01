const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { checkForbidenString } = require('../validators');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true , 'Pole Imie jest wymagane'],
        minLength: [3 , 'Pole Imie musi mieć minimum 3 znaki'],
        validate: value => checkForbidenString(value, 'name')
    },
    email: {
        type: String,
        required: [true , 'Pole Email jest wymagane'],
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        min: [1, 'Pole wiek musi wynosić minimum 1'],
        default: 1,
    },
    auth: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Auth'
    },
    image: String,
});


const User = mongoose.model('User', userSchema);

module.exports = User;