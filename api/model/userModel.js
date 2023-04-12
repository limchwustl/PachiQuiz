const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        required: true,
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
},{timestamps: true, collection: 'users'})

module.exports = mongoose.model('User', userSchema)