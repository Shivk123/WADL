// model/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    phone: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
