const { Router } = require('express');
const { insertUser, login, myProfile } = require('../controllers/user-controllers');
const { verifyToken } = require('../middlewares/login');

const userRoute = Router();

// insere um novo perfil
userRoute.post('/', insertUser);

// faz o login e inicia a sessão
userRoute.post('/login', login);

userRoute.get('/', verifyToken, myProfile);

module.exports = { userRoute };
