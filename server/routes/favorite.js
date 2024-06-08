const express = require('express');

const favoriteController = require('../controller/favorite')

const router = express.Router();



router.get('/',favoriteController.getTopBook)
router.get('/:id',favoriteController.getAllFavorite)
router.post('/', favoriteController.addToFavorite)
router.delete('/:id_user/:id_book', favoriteController.removeFromFavorite)

module.exports = router;