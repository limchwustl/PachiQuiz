const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name:{
        required: true,
        type: Object
    },
    type: {
        required: true,
        type: Array
    },
    base: {
        required: true,
        type: Object
    }
},{collection: 'pokemon'})

module.exports = mongoose.model('Pokemon', pokemonSchema)