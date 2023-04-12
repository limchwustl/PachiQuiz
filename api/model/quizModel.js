const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    
   
    pokemon_arr: {
        required: true,
        type: Array,
    },

    createdAt: { type: Date, expires: '1000m', default: Date.now }
},{timestamps: true, collection: 'quiz'})

module.exports = mongoose.model('Quiz', quizSchema)