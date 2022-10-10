/* eslint-disable no-await-in-loop */
const jwt = require('jsonwebtoken');
const { pool, begin, commit, rollback } = require('../repository/repository');
const { usersAdminList } = require('../repository/admin');

async function listPendingUsers(token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        // verifica se o usuário é um administrador
        if (token.class !== 'administrador') {
            response.Error = 'Operação não autorizada';
            response.status = 401;
            return response;
        }

        client = await pool.connect();

        if (token !== null) {
            response.token = jwt.sign(token, process.env.JWT_KEY, {
                expiresIn: 3600,
            });
        }

        begin(client);

        // lista os dados dos usuários com aprovação pendente
        const users = await usersAdminList(client);

        // altera a URL das imagens
        for (let i = 0; i < users.length; i += 1) {
            const el = users[i];
            el.image = `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${el.image}`;
        }

        response.data = users;

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

module.exports = { listPendingUsers };
