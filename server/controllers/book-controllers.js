const { addBook, pullBooks, modifyBooks } = require('../services/book-services');

async function insertBook(req, res) {
    const services = await addBook(req.body, req.files, req.user_info);
    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            message: 'Livro adicionado com sucesso',
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function listBooks(req, res) {
    const services = await pullBooks(req.user_info);

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

async function alterBooks(req, res) {
    const services = await modifyBooks(
        req.params.id,
        req.body,
        req.files,
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
            data: services.data,
        };

        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

module.exports = { insertBook, listBooks, alterBooks };
