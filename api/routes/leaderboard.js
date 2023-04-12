var express = require('express');
var router = express.Router();
const Model = require('../model/scoreModel');
const mongo = require("mongoose");

/* GET home page. */
router.get('/getAll', async function(req, res, next) {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }

});

router.put('/update',  async function(req, res, next) {
    console.log("update")
    const user = req.body
    console.log(user)
    const existingUsername = await Model.findOne({username: user.username})
    console.log(existingUsername)
    if (!existingUsername){
        res.json({message: "wrong username! sign in!"})
        return
    }

    try{
       await mongo.connect("mongodb+srv://root:pokequizroot@pokequiz.9xfn751.mongodb.net/pokemon",(err,db)=>{
        
            db.collection('scores').updateOne({username:user.username}, { $set:{score:user.score}} , (err,results)=>{
                
               res.send(200)
            })

        })
       

    }catch{
        res.status(400)
    }

});



module.exports = router;