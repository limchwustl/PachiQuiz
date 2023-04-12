const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    
    username: {
        required: true,
        type: String,
    },
    stats: {
        required: false,
        type: Array,
    }

},{timestamps:true, collection: 'stats'})

module.exports = mongoose.model('Stats', statsSchema)