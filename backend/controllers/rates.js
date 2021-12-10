const express = require('express');
const mongoose = require('mongoose');
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
        res.status(200).json(rate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//CREATE A RATE
router.post('/', user.allowIfLoggedin, async (req, res) => {
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
    } else return res.status(400).json({ msg: 'Invalid store id' })

    try {
        res.status(200).json(saveRate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//GET ALL Rates for a store by storeId
router.get('/:storeId', async (req, res) => {
    const storeId = mongoose.Types.ObjectId(req.params.storeId);
    const rates = await Rate.find({
        storeId
    });
    if (rates) res.json(rates);
    else res.status(404).json({ msg: 'Invalid request' })
});

//DELETE RATE
router.delete('/:rateId', user.allowIfLoggedin, user.grantAccess('deleteAny', 'profile'), async (req, res) => {
    try {
        const removeRate = await Rate.remove({ _id: req.params.rateId })
        res.status(200).json(removeRate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

//UPDATE RATE
router.put('/:rateId', user.allowIfLoggedin, user.grantAccess('updateAny', 'profile'), async (req, res) => {
    try {
        const updatedRate = await Rate.updateOne(
            { _id: req.params.rateId },
            {
                $set: { rate: req.body.rate }
            });
        res.status(200).json(updatedRate);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

module.exports = router;