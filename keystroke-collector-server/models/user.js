const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    id: String,
    email: String,
    password: String,
    memo: String,
    progress: Number,
});

User.statics.create = function(id, email, password, memo) {
    const user = new this({
        id,
        email,
        password,
        memo,
        progress: 0,
    });

    return user.save();
}

User.statics.findOneById = function(id) {
    return this.findOne({
        id
    }).exec();
}

User.methods.verify = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);