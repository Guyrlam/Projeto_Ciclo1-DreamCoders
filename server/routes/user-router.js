const { Router } = require('express');
const {
    insertUser,
    login,
    listProfiles,
    alterUsers,
    getUser,
    deleteUser,
    logout,
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

// faz o logout e encerra a sessão
userRoute.post('/logout', verifyToken, logout);

// lista os usuários aprovados
userRoute.get('/', optionalToken, listProfiles);

// puxa os dados de um usuário pelo id
userRoute.get('/:id', optionalToken, getUser);

// altera o perfil do usuário
userRoute.put(
    '/:id',
    verifyToken,
    upload.single('image'),
    userVerification,
    alterUsers
);

// deleta o perfil do usuário
userRoute.delete('/:id', verifyToken, deleteUser);

module.exports = { userRoute };
