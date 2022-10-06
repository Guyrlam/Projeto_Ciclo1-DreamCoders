const { addUser, logUser, userProfile } = require('../services/user-services');

async function insertUser(req, res) {
    const services = await addUser(req.body, req.file);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status).json(error);
    } else {
        const message = {
            message: 'Usuário adicionado com sucesso',
        };

        res.status(200).json(message);
    }
}

async function login(req, res) {
    const services = await logUser(req.body);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status).json(error);
    } else {
        const message = {
            message: 'Usuário logado com sucesso',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function myProfile(req, res) {
    const services = await userProfile(req.user_info);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status).json(error);
    } else {
        const message = {
            data: services.data,
        };

        res.status(200).json(message);
    }
}

module.exports = { insertUser, login, myProfile };
