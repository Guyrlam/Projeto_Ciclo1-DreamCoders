const {
    createRequest,
    respRequest,
    concludeRequest,
    deleteRequest,
    listRequest,
} = require('../services/swap-services');

async function requestSwap(req, res) {
    const services = await createRequest(req.body, req.user_info);
    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            message: 'Troca solicitada com sucesso!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function respSwap(req, res) {
    const services = await respRequest(
        req.params.resp,
        req.params.id,
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
            message: 'Requisição respondida com sucesso!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function finishSwap(req, res) {
    const services = await concludeRequest(req.params.id, req.user_info);
    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            message: 'Requisição concluída com sucesso!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function deleteSwap(req, res) {
    const services = await deleteRequest(req.params.id, req.user_info);
    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            message: 'Requisição deletada com sucesso!',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function listSwap(req, res) {
    const services = await listRequest(req.user_info);
    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            data: services.data,
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

module.exports = { requestSwap, respSwap, finishSwap, deleteSwap, listSwap };
