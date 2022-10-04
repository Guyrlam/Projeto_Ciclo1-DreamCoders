const { Router } = require('express');
const { insertCategory } = require('../controllers/category-controllers');

const categoryRoute = Router();

categoryRoute.post('/', insertCategory);

module.exports = { categoryRoute };