const { Router } = require('express');
const { insertWriter } = require('../controllers/writer-controller');

const writerRoute = Router();

writerRoute.post('/', insertWriter);

module.exports = { writerRoute };
