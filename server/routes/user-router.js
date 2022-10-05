const { Router } = require('express');
const { insertUser, login } = require('../controllers/user-controllers');
const { verifyToken } = require('../middlewares/login');

const userRoute = Router();

userRoute.post('/', insertUser);

userRoute.post('/login', login);

module.exports = { userRoute };
