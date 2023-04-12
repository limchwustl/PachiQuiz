var express = require('express');
const Model = require('../model/pokemonModel');
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
router.get('/getFilter/:filterword', async (req,res)=>{
   
    try{
   
        const data = await Model.find({'name.english': {$regex: '.*' + req.params.filterword+ '.*', '$options': 'i'}});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

})
router.get('/getOne/:id', async (req, res) => {
    try{
       
        const data = await Model.find({id:parseInt(req.params.id)});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})







module.exports = router;