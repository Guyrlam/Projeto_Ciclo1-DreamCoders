const { Router } = require('express');
const { insertUser } = require('../controllers/user-controllers');

const userRoute = Router();

userRoute.post('/', insertUser);

module.exports = { userRoute };
