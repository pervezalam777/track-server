const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const user = new User({email, password});
    try{
        const dbuser = await user.save();
        //TODO: Log user logged details in log register.
        const token = jwt.sign({
            userId:dbuser._id,
            email:dbuser.email
        }, 'ThisIsASecretKey')
        res.status(200).send({message:"user created", token})
    } catch (err) {
        //TODO: log invalid attempt in log register
        console.log("SignUp failed", email , " : ", err.message);
        res.status(403).send({message:'Something went wrong'});
    }
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).send({message:'Must provide email and password'});
    }

    try {
        const dbuser = await User.findOne({email})
        if(!dbuser){
            return res.status(403).send({message:'You are not authorized'});
        }
        if(dbuser.password === password){
        } else {
            await dbuser.comparePassword(password)
        }
        const token = jwt.sign({
            userId:dbuser._id,
            email:dbuser.email
        }, 'ThisIsASecretKey')
        res.status(200).send({message:"signin success", token})
    } catch (err){
        return res.status(403).send({message:'You are not authorized'});
    }
})

module.exports = router;