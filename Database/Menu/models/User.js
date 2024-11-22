const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    pwordhash: {type: String, required:true},
    salt: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;