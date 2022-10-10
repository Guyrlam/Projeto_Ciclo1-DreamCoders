const { Router } = require('express');
const { userPending } = require('../controllers/admin-controllers');
const { verifyToken } = require('../middlewares/login');

const adminRoute = Router();

// lista os usuários com aprovação pendente
adminRoute.get('/users', verifyToken, userPending);

module.exports = { adminRoute };
