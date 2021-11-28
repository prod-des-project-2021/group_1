const express = require('express');

const router = express.Router();
const jwt = require("jsonwebtoken");
const Rate = require('../models/rate');
const Items = require('../models/item');
const user = require('./user');
const User = require('../models/User');

//GET BACK ALL THE RATE
router.get('/', async (req, res) => {
    try {
        const rate = await Rate.find();
        res.json(rate);
    } catch (err) {
        res.json({message: err});
    }
});

//SUBMITS A RATE
router.post('/', user.allowIfLoggedin, user.grantAccess('readAny', 'profile'), async (req, res) => {
    const accessToken = req.headers["x-access-token"];
    const storeId = req.body.storeId;
    const user = await jwt.verify(accessToken, process.env.SECRET);
    if (!user.userId) return res.sendStatus(403)
    const store = await Items.findById(storeId)
    const userName = await User.findById(user.userId)
    const rate = new Rate({
        rate: req.body.rate,
        comment: req.body.comment,
        storeId,
        userName: userName.name,
        userId: user.userId
    });
    const saveRate = await rate.save();
    if (store) {
        store.rate = store.rate.concat(saveRate.rate)
        await store.save()
    } else return res.status(400).json({msg: 'Invalid store id'})
    
    try {   
        res.json(saveRate);
    } catch (err) {
        res.json({message: err});
    }
});

//GET ALL Rates for a store by storeId

router.get('/rate/:storeId', async (req, res) => {
        const rates = await Rate.find({storedId: req.params.storeId});
        if (rates) res.json(rates);
        else res.status(400).json({msg: 'Invalid request'})
});

//DELETE RATE
router.delete('/:rateId', user.allowIfLoggedin, user.grantAccess('deleteAny', 'profile'), async (req, res) => {
    try {
    const removeRate = await Rate.remove({_id: req.params.rateId})
    res.json(removeRate);
    } catch(err) {
        res.json({message: err});
    }
});

//UPDATE RATE
router.put('/:rateId', user.allowIfLoggedin, user.grantAccess('updateAny', 'profile'), async (req, res) => {
    try{
        const updatedRate = await Rate.updateOne(
            {_id: req.params.rateId}, 
            {$set: {rate: req.body.rate}
        });
        res.json(updatedRate);
    } catch(err) {
        res.json({message: err});
    }
});
module.exports = router;