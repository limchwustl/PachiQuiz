var express = require('express');
const Model = require('../model/sharedLinksModel');
const mongo = require("mongoose");
var router = express.Router();



router.get('/get/:username', async (req, res, next) =>{
  
    try{
        console.log(req.body.username)
        const data = await Model.find({username:req.params.username});
        console.log(data)
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    

})
router.put('/add',  async function(req, res, next) {
    const data = req.body
    const existingUsername = await Model.findOne({username: data.receiver})

    if (!existingUsername){
        res.json({message: "This person does not exist!"})
        return
    }

    try{
       await mongo.connect("mongodb+srv://root:pokequizroot@pokequiz.9xfn751.mongodb.net/pokemon",(err,db)=>{
        
            db.collection('sharedLinks').updateOne({username:data.receiver}, { $addToSet:{links:[data.sender, data.link]}} ,{ upsert: true }, (err,results)=>{
                
               res.send(200)
            })

        })
       

    }catch{
        res.status(400)
    }

});


module.exports = router;