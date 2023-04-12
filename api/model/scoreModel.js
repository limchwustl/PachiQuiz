const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    
    username: {
        required: true,
        type: String,
    },
    score: {
        required: true,
        type: Number,
    }
},{ collection: 'scores'})

module.exports = mongoose.model('Scores', scoreSchema)