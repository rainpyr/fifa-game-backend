const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordDigest: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },

    
    

}); // Schema

module.exports = mongoose.model('User', UserSchema);
