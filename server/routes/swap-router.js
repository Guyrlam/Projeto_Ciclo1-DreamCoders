const { Router } = require('express');
const {
    requestSwap,
    respSwap,
    finishSwap,
    deleteSwap,
    listSwap,
} = require('../controllers/swap-controllers');
const { verifyToken } = require('../middlewares/login');

const swapRoute = Router();

// cria a requisição
swapRoute.post('/', verifyToken, requestSwap);

// aceita ou rejeita a requisição
swapRoute.put('/:resp/:id', verifyToken, respSwap);

// define a requisição como concluída
swapRoute.put('/conclude/:id', verifyToken, finishSwap);

// deleta uma requisição
swapRoute.delete('/:id', verifyToken, deleteSwap);

// lista as requisições do usuário
swapRoute.get('/', verifyToken, listSwap);

module.exports = { swapRoute };
