const { addUser } = require('../services/user-services');

async function insertImage(req, res) {
    const services = await addUser(req.body, req.file);

    if (services.Error !== null) {
        res.status(services.status).json(services.Error);
    } else {
        const message = {
            message: 'Usuário adicionado com sucesso',
        };

        res.status(200).json(message);
    }
}

module.exports = { insertImage };
