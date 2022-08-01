const User = require('../../db/models/user');
const fs = require('fs');


class UserController {

    async showUsers (req, res) {
        const users = await User.find();
        res.status(200).json(users);
    }

    async create (req, res) {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            auth: req.auth._id
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch (err) {
            res.status(422).json({ errors: err.errors });
        }
    }

    async edit (req, res) {
        const { id } = req.params;
        const user = await User.findOne({_id: id});

        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.age) user.age = req.body.age;

        if (req.file?.filename && user.image) {
            fs.unlinkSync('public/uploads/' + user.image);
        }
        if (req.file?.filename) {
            user.image = req.file.filename;
        }
        
        try {
            await user.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(422).json({ errors: err.errors });
        }
    }

    async delete (req, res) {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });

        try {
            if (user.image) {
                fs.unlinkSync('public/uploads/' + user.image);
            }
            await User.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (err) {
            console.log(err);
        }
    }
    

}

module.exports = new UserController();