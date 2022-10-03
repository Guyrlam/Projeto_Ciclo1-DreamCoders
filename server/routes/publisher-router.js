const { Router } = require('express');
const { insertPublisher } = require('../controllers/publisher-controllers');

const publisherRoute = Router();

publisherRoute.post('/', insertPublisher);

module.exports = { publisherRoute };
