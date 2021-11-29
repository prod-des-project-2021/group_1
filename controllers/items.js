const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const user = require('./user');

//GET BACK ALL THE ITEMS
router.get('/', async (req, res) => {
    try {
        const item = await Item.find();
        res.status(200).json(item);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

//CREATE A ITEM
router.post('/', user.allowIfLoggedin, user.grantAccess('readAny', 'profile'), async (req, res) => {
    const item = new Item({
       name: req.body.name,
       address: req.body.address,
       price: req.body.price,
       contact_number: req.body.contact_number,
       description: req.body.description,
       discount_rate: req.body.discount_rate,
       instagram: req.body.instagram 
    });

    try {
        const saveItem = await item.save();
        res.status(200).json(saveItem);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

//GET THE ITEM BY ID
router.get('/:itemId', async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.status(200).json(item);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

//DELETE ITEMS
router.delete('/:itemId', user.allowIfLoggedin, user.grantAccess('deleteAny', 'profile'), async (req, res) => {
    try {
        const removeItem = await Item.remove({_id: req.params.itemId});
        res.status(200).json(removeItem);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

//UPDATE ITEMS
router.put('/:itemId', user.allowIfLoggedin, user.grantAccess('updateAny', 'profile'), async (req, res) => {
    try {
        const updatedItem = await Item.updateOne(
            {_id: req.params.itemId}, 
            {$set: {name: req.body.name}
        });
        res.status(200).json(updatedItem);
    } catch(err) {
        res.status(404).json({message: err});
    }
});

module.exports = router;
