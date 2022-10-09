const {
    addUser,
    logUser,
    pullProfiles,
    modifyUsers,
    pullUserByID,
    removeUser,
    logoutUser,
} = require('../services/user-services');

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

function logout(req, res) {
    const services = logoutUser(req.user_info);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            data: 'Sessão encerrada!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
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
            user_class: services.user_class,
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

async function getUser(req, res) {
    const services = await pullUserByID(req.params.id, req.user_info);

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

async function alterUsers(req, res) {
    const services = await modifyUsers(
        req.params.id,
        req.body,
        req.file,
        req.user_info
    );

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            data: 'Perfil alterado com sucesso!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function deleteUser(req, res) {
    const services = await removeUser(req.params.id, req.user_info);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            data: 'Usuário deletado com sucesso!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

module.exports = {
    insertUser,
    login,
    listProfiles,
    alterUsers,
    getUser,
    deleteUser,
    logout,
};
