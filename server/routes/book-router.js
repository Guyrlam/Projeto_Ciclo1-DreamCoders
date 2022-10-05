const { Router } = require('express');
const { insertBook } = require('../controllers/book-controllers.js');

const bookRoute = Router();

bookRoute.post('/', insertBook);

module.exports = { bookRoute };
