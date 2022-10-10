const { Router } = require('express');
const {
    userPending,
    bookPending,
    rateUser,
    rateBook,
} = require('../controllers/admin-controllers');
const { verifyToken } = require('../middlewares/login');

const adminRoute = Router();

// lista os usuários com aprovação pendente
adminRoute.get('/users', verifyToken, userPending);

// lista os livros com aprovação pendente
adminRoute.get('/books', verifyToken, bookPending);

// avalia o registro de um usuário
adminRoute.put('/users/:rate/:id', verifyToken, rateUser);

// avalia o registro de um livro
adminRoute.put('/books/:rate/:id', verifyToken, rateBook);

module.exports = { adminRoute };
