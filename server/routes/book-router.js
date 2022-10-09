const { Router } = require('express');
const {
    insertBook,
    listBooks,
    alterBooks,
    getBook,
} = require('../controllers/book-controllers');
const { verifyToken, optionalToken } = require('../middlewares/login');
const { upload } = require('../middlewares/multer');
const { bookVerification } = require('../middlewares/book-validators');

const bookRoute = Router();

// adiciona um novo livro
bookRoute.post(
    '/',
    verifyToken,
    upload.array('image', 4),
    bookVerification,
    insertBook
);

// lista os livros ativos no sistema
bookRoute.get('/', optionalToken, listBooks);

// altera o registro de um livro
bookRoute.put(
    '/:id',
    verifyToken,
    upload.array('image', 4),
    bookVerification,
    alterBooks
);

// puxa os dados de um livro pelo id
bookRoute.get('/:id', optionalToken, getBook);

module.exports = { bookRoute };
