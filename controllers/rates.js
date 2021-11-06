const express = require('express');

const router = express.Router();
const Rate = require('../models/rate');
const verify = require('./verifyToken');

//GET BACK ALL THE RATE
router.get('/', verify, async (req, res) => {
    try {
        const rate = await Rate.find();
        res.json(rate);
    } catch (err) {
        res.json({message: err});
    }
});

//SUBMITS A RATE
router.post('/', async (req, res) => {
    const rate = new Rate({
        rate: req.body.rate,
        comment: req.body.comment,
        owner: req.body.owner
    });

    try {
        const saveRate = await rate.save();
        res.json(saveRate);
    } catch (err) {
        res.json({message: err});
    }
});

//SPECIFIC RATE
router.get('/:rateId', async (req, res) => {
    try {
    const rate = await Rate.findById(req.params.rateId);
    res.json(rate);
    } catch {
        res.json({message: err});
    }
});

//DELETE RATE
router.delete('/:rateId', async (req, res) => {
    try {
    const removeRate = await Rate.remove({_id: req.params.rateId})
    res.json(removeRate);
    } catch(err) {
        res.json({message: err});
    }
});

//UPDATE RATE
router.put('/:rateId', async (req, res) => {
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