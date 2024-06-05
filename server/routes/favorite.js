const express = require('express');

const favoriteController = require('../controller/favorite')

const router = express.Router();



router.get('/:id',favoriteController.getAllFavorite)
router.post('/', favoriteController.addToFavorite)
router.delete('/', favoriteController.removeFromFavorite)

module.exports = router;