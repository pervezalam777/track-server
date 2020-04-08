const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');

const router = express.Router()
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    console.log("track user: ", req.user);
    const tracks = await Track.find({userId: req.user._id});
    
    res.status(200).send({tracks});
})

router.post('/tracks', async (req, res) => {
    const {name, locations} = req.body;
    if(!name || !locations) {
        return res.status(422).send({message:'You must provide name and locations'})
    }

    const track = new Track({name, locations, userId:req.user._id});
    try{
        await track.save();
        res.send(track)
    } catch(err){
        res.status(422).send({message:'Something went wrong'});
        //TODO: log this information to log service.
    }
})

module.exports = router;