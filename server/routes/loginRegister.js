const express = require('express');
const refreshToken = require('../controller/refreshToken.js')
const usersController = require('../controller/users.js')

const router = express.Router();

router.get('/token', refreshToken.refreshToken)
router.post('/login', usersController.loginUser)
router.delete('/logout', usersController.logoutUser)

module.exports = router;