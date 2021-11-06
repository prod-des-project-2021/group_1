const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req, res) => {

    //LETS VALIDATE THE DATA BEFORE CREATE ACCOUNT
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const usernameExists = await User.findOne({username: req.body.username});
    if(usernameExists) return res.status(400).send('Username already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.passwordHash, salt);
    //Create a new user
    const user = new User({
        username: req.body.username,
        name: req.body.name,
        passwordHash: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});

    }catch(err){
        res.status(404).send(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE LOGIN
    const{ error } = loginValidation(req.body);
    if (error)  return res.status(400).send(error.details[0].message);
        //Checking if the user is already in the database
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(400).send('Username is not found');
        //PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.passwordHash, user.passwordHash);
        if(!validPass) return res.status(400).send('Invalid password');

        //Create and assign a token 
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        res.header('auth-token', token).send(token);
});

module.exports = router;