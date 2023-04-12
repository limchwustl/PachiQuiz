var express = require('express');
const Model = require('../model/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var router = express.Router();

const verifyToken = (req,res,next)=>{

    const token = req.headers['token']

    if (typeof token === "undefined"){
        return res.status(400)
    }

    jwt.verify(token, "secretkey", (err, authData)=>{
        if (err) {
            res.status(400)
            
        }else{
            req.user = {}
            req.user.id = authData.id
            req.user.username = authData.username
            next()
        }
    })

}
router.get("/isUserAuth", verifyToken, (req,res)=>{
   
    res.json({isLoggedIn: true, username: req.user.username})
})

  
router.post('/',  (req, res)=> {
    const user = req.body

    Model.findOne({username: user.username})
    .then((curUser=>{
        if (!curUser){
            return res.status(400).json({
                message:"wrong username"
            })
        }
        bcrypt.compare(user.password, curUser.password)
        .then(isMatching=>{
            if (isMatching){
                const payload = {
                    id: curUser._id,
                    username: curUser.username,
                }
              
                jwt.sign(
                    payload,
                    'secretkey',
                    {expiresIn:7200},
                    (err,token)=>{
                        if (err) return res.status(400).json({message: err})
                        return res.json({
                            message: "successfully logged in",
                            token: token,
                            username: curUser.username,

                        })
                    }
                )
            } else{
                return res.status(400).json({
                    message: "Wrong username"

                })
            }

        })


    }))


});


module.exports = router;