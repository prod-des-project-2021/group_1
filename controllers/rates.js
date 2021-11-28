const express = require('express');

const router = express.Router();
const jwt = require("jsonwebtoken");
const Rate = require('../models/rate');
const Items = require('../models/item');
const user = require('./user');

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
    const rate = new Rate({
        rate: req.body.rate,
        comment: req.body.comment,
        userId: user.userId
    });
    const saveRate = await rate.save();
    if (store) {
        store.rate = store.rate.concat(saveRate._id)
        console.log(store.rate)
    await store.save();}
    else return res.sendStatus(400)
    try {   
       
        res.json(saveRate);
        console.log(rate);
    } catch (err) {
        res.json({message: err});
    }
});

//GET ALL RATES FOR THIS storeId

router.get('/rate/:storeId', async (req, res) => {
        await Rate.find({storeId: req.params.storeId});
        const rates = await Rate.find({storedId: '61a2b85577772ccd1a0ede55'});
        if (rates) res.json(rates);
        console.log(req.params.storeId)
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