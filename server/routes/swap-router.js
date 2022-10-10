const { Router } = require('express');
const { requestSwap, respSwap } = require('../controllers/swap-controllers');
const { verifyToken } = require('../middlewares/login');

const swapRoute = Router();

// cria a requisição
swapRoute.post('/', verifyToken, requestSwap);

// aceita ou rejeita a requisição
swapRoute.put('/:resp/:id', verifyToken, respSwap);

module.exports = { swapRoute };
