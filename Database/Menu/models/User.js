const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    pwordhash: {type: String, required:true},
    salt: { type: String, required: true },
    role: { type: String, required: true, enum: ['Server', 'Manager', 'Chef'] },
    name: { type: String, required: true } // Add name field
});

const User = mongoose.model('User', userSchema);
module.exports = User;