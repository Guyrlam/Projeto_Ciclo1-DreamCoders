const { Router } = require('express');
const { insertImage } = require('../controllers/images-controllers');

const imagesRoute = Router();

imagesRoute.post('/', insertImage);

module.exports = { imagesRoute };
