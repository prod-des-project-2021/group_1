const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get('/user/:userId', user.allowIfLoggedin, user.getUser);

router.get('/users', user.allowIfLoggedin, user.grantAccess('readAny', 'profile'), user.getUsers);

router.put('/user/:userId', user.allowIfLoggedin, user.grantAccess('updateAny', 'profile'), user.updateUser);

router.delete('/user/:userId', user.allowIfLoggedin, user.grantAccess('deleteAny', 'profile'), user.deleteUser);

module.exports = router;