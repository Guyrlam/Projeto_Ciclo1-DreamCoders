const { Router } = require('express');
const {
    insertBook,
    listBooks,
    alterBooks,
    getBook,
    deleteBook,
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

// puxa os dados de um livro pelo id
bookRoute.get('/:id', optionalToken, getBook);

// altera o registro de um livro
bookRoute.put(
    '/:id',
    verifyToken,
    upload.array('image', 4),
    bookVerification,
    alterBooks
);

// faz um soft delete no registro de um livro
bookRoute.delete('/:id', verifyToken, deleteBook);

module.exports = { bookRoute };
