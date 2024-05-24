const express = require('express');

const booksController = require('../controller/books.js')

const router = express.Router();

router.get('/',booksController.getAllBooks)
router.get('/:id',booksController.findBookById)
router.post('/',booksController.createNewBooks)
router.patch('/:id', booksController.updateBooks)
router.delete('/:id', booksController.deleteBooks)

module.exports = router;