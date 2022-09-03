const mongoose = require('mongoose');
const User = require('../models/user');

const Data = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    agent: String,
    progress: Number,
    data: Object,
}, {
    timestamps: true,
});

Data.statics.create = function(userId, data) {
    User.findOneById(userId).then((user) => {
        return new this({
            user: user._id,
            agent: data.agent,
            progress: data.progress,
            data: data.data,
        }).save();
    });
}

module.exports = mongoose.model('Data', Data);