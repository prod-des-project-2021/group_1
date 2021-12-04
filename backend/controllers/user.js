const express = require('express');
const User = require('../models/User');
const { roles } = require('../roles')
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

exports.allowIfLoggedin = async (req, res, next) => {
    try {
        console.log('Go here ok')
        const reqToken = req.rawHeaders[1]
        console.log(reqToken)
        const verified = jwt.verify(reqToken, process.env.SECRET);
        console.log(verified)
        const user = await User.findById(verified.userId)
        console.log(user)
        req.user = user;
        next();
    } catch (error) {
        console.log('not ok go here')
        res.status(403).send(error);
    }
}