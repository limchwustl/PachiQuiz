var express = require('express');
const Model = require('../model/statsModel');
const mongo = require("mongoose");
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID
const bcrypt = require('bcrypt')
var router = express.Router();



router.get('/getAll/:username', async (req, res, next) =>{
  
    try{
        console.log(req.body.username)
        const data = await Model.find({username:req.params.username});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
    

})
router.put('/add',  async function(req, res, next) {
    const user = req.body
    const existingUsername = await Model.findOne({username: user.username})

    if (!existingUsername){
        res.json({message: "wrong username! sign in!"})
        return
    }

    try{
       await mongo.connect("mongodb+srv://root:pokequizroot@pokequiz.9xfn751.mongodb.net/pokemon",(err,db)=>{
        
            db.collection('stats').updateOne({username:user.username}, { $push:{stats:[user.stat, new Date(Date.now()).toString()]}} ,{ upsert: true }, (err,results)=>{
                
               res.send(200)
            })

        })
       

    }catch{
        res.status(400)
    }

});


module.exports = router;