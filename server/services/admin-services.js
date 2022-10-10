/* eslint-disable no-await-in-loop */
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const {
    usersAdminList,
    booksAdminList,
    approveUser,
    rejectUser,
    pullRejected,
    approveBook,
    rejectBook,
} = require('../repository/admin');
const { pool, begin, commit, rollback } = require('../repository/repository');
const {
    bookImagesList,
    deleteImagesByName,
    deleteImagesByBookID,
} = require('../repository/images');

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

async function userReview(rate, userID, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        // verifica se o usuário é um administrador
        if (token.class !== 'administrador') {
            rollback(client);
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

        // seleciona os dados do registro em rejeição
        const user = await pullRejected(userID, client);

        if (rate === 'approved') {
            // aprova o registro do usuário
            await approveUser(userID, client);

            // diretórios das pastas que armazenam imagens
            const src = `${__dirname}/../images/uploads/${user.image}`;
            const dest = `${__dirname}/../images/storage/${user.image}`;

            // transfere a imagem do perfil para a pasta storage
            await fs.move(src, dest);
        } else if (rate === 'rejected') {
            // rejeita o registro do usuário
            await rejectUser(userID, client);

            // faz um soft delete na imagem do usuário
            await deleteImagesByName(user.image, client);
        } else {
            rollback(client);
            response.Error = 'Operação não identificada';
            response.status = 400;
            return response;
        }

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function bookReview(rate, bookID, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        // verifica se o usuário é um administrador
        if (token.class !== 'administrador') {
            rollback(client);
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

        if (rate === 'approved') {
            // aprova o registro do livro
            await approveBook(bookID, client);

            const imageList = await bookImagesList(bookID, client);
            for (let x = 0; x < imageList.length; x += 1) {
                const image = imageList[x].filename;

                // diretórios das pastas que armazenam imagens
                const src = `${__dirname}/../images/uploads/${image}`;
                const dest = `${__dirname}/../images/storage/${image}`;

                // transfere a imagem do perfil para a pasta storage
                await fs.move(src, dest);
            }
        } else if (rate === 'rejected') {
            // rejeita o registro do usuário
            await rejectBook(bookID, client);

            // deleta imagens
            await deleteImagesByBookID(bookID, client);
        } else {
            rollback(client);
            response.Error = 'Operação não identificada';
            response.status = 400;
            return response;
        }

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

module.exports = { listPendingUsers, listPendingBooks, userReview, bookReview };
