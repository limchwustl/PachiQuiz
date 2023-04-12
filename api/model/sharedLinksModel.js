const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema({
    
    username: {
        required: true,
        type: String,
    },
    links: {
        required: false,
        type: Array,
    },
    createdAt: { type: Date, expires: '1000m', default: Date.now }
},{timestamps: true, collection: 'sharedLinks'})

module.exports = mongoose.model('sharedLinks', linksSchema)