const express = require('express');
const router = express.Router();
const { getAllBooks, borrowBook, returnBook } = require('../controllers/book.controller');

router.get('/', getAllBooks);
router.post('/borrow', borrowBook);
router.post('/return', returnBook);

module.exports = router;