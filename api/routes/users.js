var express = require('express');
const Model = require('../model/userModel');
var router = express.Router();


router.get('/getAll', async (req, res, next) =>{
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    
    

});

module.exports = router;