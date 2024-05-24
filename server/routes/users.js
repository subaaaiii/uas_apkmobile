const express = require('express');

const usersController = require('../controller/users.js')

const router = express.Router();

router.get('/',usersController.getAllUsers)
router.get('/:id',usersController.findUserById)
router.post('/',usersController.createNewUser)
router.patch('/:id', usersController.updateUser)
router.delete('/:id', usersController.deleteUser)

module.exports = router;