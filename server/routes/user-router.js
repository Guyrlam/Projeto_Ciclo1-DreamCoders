const { Router } = require('express');
const {
    insertUser,
    login,
    listProfiles,
    alterUsers,
} = require('../controllers/user-controllers');
const { optionalToken, verifyToken } = require('../middlewares/login');
const { upload } = require('../middlewares/multer');
const {
    userVerification,
    passwordVerification,
} = require('../middlewares/user-validators');

const userRoute = Router();

// insere um novo perfil
userRoute.post(
    '/',
    upload.single('image'),
    userVerification,
    passwordVerification,
    insertUser
);

// faz o login e inicia a sessão
userRoute.post('/login', login);

// lista os usuários aprovados
userRoute.get('/', optionalToken, listProfiles);

// altera o perfil do usuário
userRoute.put(
    '/:id',
    verifyToken,
    upload.single('image'),
    userVerification,
    alterUsers
);

module.exports = { userRoute };
