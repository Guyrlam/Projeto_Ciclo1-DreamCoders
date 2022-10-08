const { addUser, logUser, pullProfiles } = require('../services/user-services');

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
            logged: services.user_id,
            message: 'Usuário logado com sucesso',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function listProfiles(req, res) {
    const services = await pullProfiles(req.user_info);

    if (services.token) {
        res.cookie('token', services.token, { maxAge: 900000, httpOnly: true });
    }

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

module.exports = { insertUser, login, listProfiles };
