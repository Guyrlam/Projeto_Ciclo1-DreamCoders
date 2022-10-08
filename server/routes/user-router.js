const { Router } = require('express');
const {
    insertUser,
    login,
    listProfiles,
} = require('../controllers/user-controllers');
const { optionalToken } = require('../middlewares/login');
const { upload } = require('../middlewares/multer');
const { addUserVerification } = require('../middlewares/user-validators');

const userRoute = Router();

// insere um novo perfil
userRoute.post('/', upload.single('image'), addUserVerification, insertUser);

// faz o login e inicia a sessão
userRoute.post('/login', login);

// lista os usuários aprovados
userRoute.get('/', optionalToken, listProfiles);

module.exports = { userRoute };
