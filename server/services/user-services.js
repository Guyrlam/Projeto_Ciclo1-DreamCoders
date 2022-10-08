/* eslint-disable no-await-in-loop */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool, begin, commit, rollback } = require('../repository/repository');
const { insertUser, tokenInfo, userList } = require('../repository/users');
const { newImage, selectByName, bookImagesList } = require('../repository/images');
const { selectClassID } = require('../repository/user-classes');
const {
    dataBaseVerification,
    logVerification,
    logDBVerification,
} = require('../validators/user-validators');
const { userBookList } = require('../repository/books');

async function addUser(data, image) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        begin(client);

        // verificar se o usuário existe
        const verifiedDB = await dataBaseVerification(
            data.email,
            data.telephone,
            client
        );
        if (verifiedDB.Error !== null) {
            rollback(client);
            client.release();
            return verifiedDB;
        }

        // insere a imagem na tabela
        await newImage(image.filename, image.path, client);

        // retorna o uuid da imagem
        const imageID = await selectByName(image.filename, client);

        // retorna o uuid do tipo de usuário
        const classID = await selectClassID(data.class, client);

        // criptografa a senha do usuário
        const hashed = await bcrypt.hash(data.password, 10);

        const userArray = [
            data.name,
            imageID,
            classID,
            data.email,
            data.telephone,
            hashed,
        ];

        // adiciona usuário ao banco de dados
        await insertUser(userArray, client);

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function logUser(data) {
    const response = {
        Error: null,
    };

    let client;

    try {
        const verifiedData = logVerification(data);
        if (verifiedData !== true) {
            response.Error = verifiedData;
            response.status = 400;
            return response;
        }

        client = await pool.connect();

        begin(client);

        // verificar se o login está correto
        const verifiedDB = await logDBVerification(
            data.email,
            data.password,
            client
        );
        if (verifiedDB.Error !== null) {
            rollback(client);
            client.release();
            return verifiedDB;
        }

        // captura de informações para o token
        const userInfo = await tokenInfo(data.email, client);
        response.user_id = userInfo.user_id;

        // criação do token
        response.token = jwt.sign(userInfo, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function pullProfiles(token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        if (token !== null) {
            response.token = jwt.sign(token, process.env.JWT_KEY, {
                expiresIn: 3600,
            });
        }

        begin(client);

        // lista os dados dos usuários
        const users = await userList(client);

        // adiciona a lista de livros a cada perfil
        for (let i = 0; i < users.length; i += 1) {
            const el = users[i];
            el.image = `http://${process.env.NDHOST}:${process.env.NDPORT}/uploads/${el.image}`;
            el.books = [];
            const bookList = await userBookList(el.id, client);
            for (let x = 0; x < bookList.length; x += 1) {
                const book = bookList[x];
                book.image = [];
                const imageList = await bookImagesList(book.id, client);
                for (let y = 0; y < imageList.length; y += 1) {
                    const image = imageList[y].filename;
                    book.image.push(
                        `http://${process.env.NDHOST}:${process.env.NDPORT}/uploads/${image}`
                    );
                }
                el.books.push(book);
            }
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

module.exports = { addUser, logUser, pullProfiles };
