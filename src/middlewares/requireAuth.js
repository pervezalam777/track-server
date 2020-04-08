const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const util = require('util');

const jwtVerify = util.promisify(jwt.verify);

module.exports = async (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization){
        return res.status(403).send({message:'You must be logged in'});
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const userDetails = await jwtVerify(token, "ThisIsASecretKey");
        const dbUser = await User.findById(userDetails.userId);
        if(!dbUser) {
            return res.status(403).send({message:'You are not authorized!!'});
        }
        req.user = dbUser;
    } catch(err){
        return res.status(403).send({message:'You are not authorized'});
    }
    next();  
}