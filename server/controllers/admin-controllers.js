const { listPendingUsers } = require('../services/admin-services');

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

module.exports = { userPending };
