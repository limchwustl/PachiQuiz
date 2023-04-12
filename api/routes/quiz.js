var express = require('express');
const Model = require('../model/quizModel');
const mongo = require("mongoose");
const ObjectId = require('mongodb').ObjectID
var router = express.Router();



router.get('/find/:id', async (req, res)=>{

  try{
    
    const data = await Model.find({"_id":ObjectId(req.params.id)});
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
  
});


router.post('/add',  async function(req, res, next) {
  const quiz = req.body
  console.log(quiz.quiz)
  const quizData = new Model({
    pokemon_arr: quiz.quiz,
    
  })

  try{
    
    const dataToSave = quizData.save((err,data)=>{
      res.status(200).send(data._id)
    });
            
  
     

  }catch{
      res.status(400)
  }

});

module.exports = router;
