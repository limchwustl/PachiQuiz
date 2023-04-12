const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    
    username: {
        required: true,
        type: String,
    },
    friends: {
        required: false,
        type: Array,
    }
},{ collection: 'friends'})

module.exports = mongoose.model('Friends', friendsSchema)