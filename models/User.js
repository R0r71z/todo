const { mongoose } = require('../db'),
      bluebird = require('bluebird'),
      bcrypt = bluebird.promisifyAll(require("bcrypt"));

const User = mongoose.Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    email: String,
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }],
    logged_in: {type: Boolean, default: false},
    sessions: [String],
});

User.pre('save', async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const hash = await bcrypt.hashAsync(`${this.password}/${process.env.SALT}`, 16.5);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

User.methods.passwordIsValid = async function (password) {
    try {
        return await bcrypt.compareAsync(`${password}/${process.env.SALT}`, this.password);
    }
    catch (err) {
        throw err;
    }
 };

const UserModel = mongoose.model('User', User);

module.exports = UserModel;