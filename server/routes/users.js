const express = require('express');
const {uploadProfile} = require('../middleware/multer.js')
const usersController = require('../controller/users.js')

const router = express.Router();

router.get('/',usersController.getAllUsers)
router.get('/:id',usersController.findUserById)
router.post('/',usersController.createNewUser)
router.patch('/:id', uploadProfile, usersController.updateUser)
router.delete('/:id', usersController.deleteUser)
router.post('/login',usersController.loginUser)

module.exports = router;