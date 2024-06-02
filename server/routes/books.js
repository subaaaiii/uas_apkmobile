const express = require('express');

const booksController = require('../controller/books.js')

const router = express.Router();

const {uploadBook} = require('../middleware/multer.js')

router.get('/',booksController.getAllBooks)
router.get('/:id',booksController.findBookById)
router.post('/', uploadBook, booksController.createNewBooks)
router.patch('/:id', uploadBook, booksController.updateBooks)
router.delete('/:id', booksController.deleteBooks)

module.exports = router;