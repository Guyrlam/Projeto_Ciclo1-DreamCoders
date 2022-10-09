const { Router } = require('express');
const {
    insertBook,
    listBooks,
    alterBooks,
} = require('../controllers/book-controllers');
const { verifyToken, optionalToken } = require('../middlewares/login');
const { upload } = require('../middlewares/multer');
const { bookVerification } = require('../middlewares/book-validators');

const bookRoute = Router();

bookRoute.post(
    '/',
    verifyToken,
    upload.array('image', 4),
    bookVerification,
    insertBook
);

bookRoute.get('/', optionalToken, listBooks);

bookRoute.put(
    '/:id',
    verifyToken,
    upload.array('image', 4),
    bookVerification,
    alterBooks
);

module.exports = { bookRoute };
