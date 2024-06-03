const express = require('express');
const refreshToken = require('../controller/refreshToken.js')
const usersController = require('../controller/users.js')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API is running')
})
router.get('/token', refreshToken.refreshToken)
router.post('/login', usersController.loginUser)
router.delete('/logout', usersController.logoutUser)

module.exports = router;