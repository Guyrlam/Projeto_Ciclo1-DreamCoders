const {
    listPendingUsers,
    listPendingBooks,
    userReview,
    bookReview,
} = require('../services/admin-services');

async function userPending(req, res) {
    const services = await listPendingUsers(req.user_info);

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

async function bookPending(req, res) {
    const services = await listPendingBooks(req.user_info);

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

async function rateUser(req, res) {
    const services = await userReview(req.params.rate, req.params.id, req.user_info);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            message: 'Status atualizado com sucesso!',
        };
        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

async function rateBook(req, res) {
    const services = await bookReview(req.params.rate, req.params.id, req.user_info);

    if (services.Error !== null) {
        const error = {
            ERROR: services.Error,
        };
        res.status(services.status)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(error);
    } else {
        const message = {
            message: 'Status atualizado com sucesso!',
        };
        res.status(200)
            .cookie('token', services.token, { maxAge: 900000, httpOnly: true })
            .json(message);
    }
}

module.exports = { userPending, bookPending, rateUser, rateBook };
