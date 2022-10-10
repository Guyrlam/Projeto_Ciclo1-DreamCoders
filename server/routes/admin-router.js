const { Router } = require('express');
const { userPending, bookPending } = require('../controllers/admin-controllers');
const { verifyToken } = require('../middlewares/login');

const adminRoute = Router();

// lista os usuários com aprovação pendente
adminRoute.get('/users', verifyToken, userPending);

// lista os livros com aprovação pendente
adminRoute.get('/books', verifyToken, bookPending);

module.exports = { adminRoute };
