var express = require('express');
const Model = require('../model/userModel');
const FriendModel = require('../model/friendsModel')
const ScoreModel = require('../model/scoreModel')
const LinksModel = require('../model/sharedLinksModel')
const StatsModel = require('../model/statsModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var router = express.Router();


router.post('/',  async function(req, res, next) {
    const user = req.body

    const existingUsername = await Model.findOne({username: user.username})
    const existingEmail = await Model.findOne({email: user.email})
    if (existingUsername) {
        res.status(400).json({message: "username already Taken"})
        return
        
    }
    if (existingEmail){
        res.status(400).json({message: "Email already Taken"})
        return
    
    }
        user.password = await bcrypt.hash(req.body.password, 10)

        const data = new Model({
            email:user.email.toLowerCase(),
            username: user.username,
            password: user.password
        })

        const friendData = new FriendModel({
            username: user.username,
            friends: []
        })
        const scoreData = new ScoreModel({
            username: user.username,
            score: 0
        })
        const linksData = new LinksModel({
            username: user.username,
            links: []
        })
        const statsData = new StatsModel({
            username: user.username,
            stats: []
        })
        try {
            const dataToSave = data.save();
            const friendsDataToSave = friendData.save()
            const scoreDataToSave = scoreData.save()
            const linksDataToSave = linksData.save()
            const statsDataToSave = statsData.save()
            res.status(200).json(dataToSave)
            

        }
        catch (error) {
            res.status(400).json({message: error.message})
        }

    
    

});


module.exports = router;