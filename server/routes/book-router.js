const { Router } = require('express');
const { insertBook } = require('../controllers/book-controllers');
const { verifyToken } = require('../middlewares/login');

const bookRoute = Router();

bookRoute.post('/', verifyToken, insertBook);

module.exports = { bookRoute };
