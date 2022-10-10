/* eslint-disable no-await-in-loop */
const jwt = require('jsonwebtoken');
const { usersAdminList, booksAdminList } = require('../repository/admin');
const { pool, begin, commit, rollback } = require('../repository/repository');
const { bookImagesList } = require('../repository/images');

async function listPendingUsers(token) {
    const response = {
        Error: null,
    };

    try {
        // verifica se o usuário é um administrador
        if (token.class !== 'administrador') {
            response.Error = 'Operação não autorizada';
            response.status = 401;
            return response;
        }

        if (token !== null) {
            response.token = jwt.sign(token, process.env.JWT_KEY, {
                expiresIn: 3600,
            });
        }

        // lista os dados dos usuários com aprovação pendente
        const users = await usersAdminList();

        // altera a URL das imagens
        for (let i = 0; i < users.length; i += 1) {
            const el = users[i];
            el.image = `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${el.image}`;
        }

        response.data = users;
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
    }

    return response;
}

async function listPendingBooks(token) {
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

        if (token !== null) {
            response.token = jwt.sign(token, process.env.JWT_KEY, {
                expiresIn: 3600,
            });
        }

        client = await pool.connect();

        begin(client);

        // lista os dados dos usuários com aprovação pendente
        const books = await booksAdminList(client);

        // adiciona a lista de URL's de imagens aos livros
        for (let i = 0; i < books.length; i += 1) {
            const el = books[i];
            el.images = [];
            const imageList = await bookImagesList(el.id, client);
            for (let x = 0; x < imageList.length; x += 1) {
                const image = imageList[x].filename;
                el.images.push(
                    `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${image}`
                );
            }
        }

        response.data = books;

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

module.exports = { listPendingUsers, listPendingBooks };
