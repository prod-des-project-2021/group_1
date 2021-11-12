const express = require('express');

const router = express.Router();
const Item = require('../models/item');

//GET BACK ALL THE ITEMS
router.get('/', async (req, res) => {
    try {
        const item = await Item.find();
        res.json(item);
    } catch(err) {
        res.json({message: err});
    }
});

//SUBMITS A ITEM
router.post('/', async (req, res) => {
    const item = new Item({
       name: req.body.name,
       address: req.body.address,
       rate: req.body.rate,
       price: req.body.price,
       contact_number: req.body.contact_number,
       description: req.body.description,
       discount_rate: req.body.discount_rate,
       instagram: req.body.instagram 
    });

    try {
    const saveItem = await item.save();
    res.json(saveItem);
    } catch(err) {
        res.json({message: err})
    }
});

//SPECIFIC ITEMS
router.get('/:itemId', async (req, res) => {
    try {
    const item = await Item.findById(req.params.itemId);
    res.json(item);
    } catch {
        res.json({message: err});
    }
});

//DELETE ITEMS
router.delete('/:itemId', async (req, res) => {
    try {
    const removeItem = await Item.remove({_id: req.params.itemId})
    res.json(removeItem);
    } catch(err) {
        res.json({message: err});
    }
});

//UPDATE ITEMS
router.put('/:itemId', async (req, res) => {
    try{
        const updatedItem = await Item.updateOne(
            {_id: req.params.itemId}, 
            {$set: {name: req.body.name}
        });
        res.json(updatedItem);
    } catch(err) {
        res.json({message: err});
    }
});

module.exports = router;