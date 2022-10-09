/* eslint-disable no-await-in-loop */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool, begin, commit, rollback } = require('../repository/repository');
const {
    insertUser,
    tokenInfo,
    userList,
    changePassword,
    updateUser,
    getUserByID,
    removeUserByID,
} = require('../repository/users');
const {
    newImage,
    selectByName,
    bookImagesList,
    deleteUserImage,
    changeImage,
    deleteImagesByBookID,
    deleteImagesByName,
} = require('../repository/images');
const { selectClassID } = require('../repository/user-classes');
const {
    dataBaseVerification,
    logVerification,
    logDBVerification,
    userVerification,
} = require('../validators/user-validators');
const { userBookList, removeByID } = require('../repository/books');

async function addUser(data, image) {
    const response = {
        Error: null,
    };

    let client;

    try {
        // impossibilita o cadastro imediato de administradores
        if (data.class !== 'cliente') {
            response.Error = 'Operação não autorizada';
            response.status = 401;
            return response;
        }

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
        response.user_class = userInfo.class;

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

function logoutUser(token) {
    const response = {
        Error: null,
    };

    try {
        // criação do token com tempo de expiração = 0
        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 0,
        });
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
    }

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
            el.image = `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${el.image}`;
            el.books = [];
            const bookList = await userBookList(el.id, client);
            for (let x = 0; x < bookList.length; x += 1) {
                const book = bookList[x];
                book.image = [];
                const imageList = await bookImagesList(book.id, client);
                for (let y = 0; y < imageList.length; y += 1) {
                    const image = imageList[y].filename;
                    book.image.push(
                        `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${image}`
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

async function pullUserByID(userID, token) {
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

        // puxa os dados do usuário
        const user = await getUserByID(userID, client);

        // adiciona a lista de livros ao perfil
        user.image = `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${user.image}`;
        user.books = [];
        const bookList = await userBookList(user.id, client);
        for (let x = 0; x < bookList.length; x += 1) {
            const book = bookList[x];
            book.image = [];
            const imageList = await bookImagesList(book.id, client);
            for (let y = 0; y < imageList.length; y += 1) {
                const image = imageList[y].filename;
                book.image.push(
                    `//${process.env.NDHOST}:${process.env.NDPORT}/uploads/${image}`
                );
            }
            user.books.push(book);
        }

        response.data = user;

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function modifyUsers(userId, data, image, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        begin(client);

        // verificar se o id do usuário é o mesmo do alterado
        const verifiedUser = await userVerification(userId, data.class, token);
        if (verifiedUser.Error !== null) {
            rollback(client);
            client.release();
            return verifiedUser;
        }

        // deleta a imagem
        if (data.deleted_image) {
            await deleteUserImage(data.deleted_image, client);
        }

        // insere a imagem na tabela
        if (image) {
            await newImage(image.filename, image.path, client);

            // retorna o uuid da imagem
            const imageID = await selectByName(image.filename, client);

            // altera o valor na tabela de usuários
            await changeImage(userId, imageID, client);
        }

        // retorna o uuid do tipo de usuário
        const classID = await selectClassID(data.class, client);

        // altera a senha do usuário
        if (data.password) {
            // criptografa a senha do usuário
            const hashed = await bcrypt.hash(data.password, 10);

            // altera a senha na tabela
            await changePassword(userId, hashed, client);
        }

        const userArray = [
            data.name,
            classID,
            data.email,
            data.telephone,
            userId,
            data.description,
        ];

        // altera os dados do usuário
        await updateUser(userArray, client);

        // captura de informações para o token
        const userInfo = await tokenInfo(data.email, client);

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

async function removeUser(userId, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        begin(client);

        // puxa os dados do usuário
        const user = await getUserByID(userId, client);

        // verificar se o id do usuário é o mesmo do token
        const verifiedUser = await userVerification(userId, user.class, token);
        if (verifiedUser.Error !== null) {
            rollback(client);
            client.release();
            return verifiedUser;
        }

        // faz um soft delete nos dados do usuário
        await removeUserByID(userId, client);

        // faz um soft delete na imagem do usuário
        await deleteImagesByName(user.image, client);

        // seleciona os livros do usuário deletado
        const bookList = await userBookList(userId, client);

        for (let i = 0; i < bookList.length; i += 1) {
            const bookId = bookList[i].id;

            // faz um soft delete nos dados do livro
            await removeByID(bookId, client);

            // deleta imagens
            await deleteImagesByBookID(bookId, client);
        }

        if (token.class === 'administrador') {
            response.token = jwt.sign(token, process.env.JWT_KEY, {
                expiresIn: 3600,
            });
        } else {
            response.token = jwt.sign(token, process.env.JWT_KEY, {
                expiresIn: 0,
            });
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

module.exports = {
    addUser,
    logUser,
    pullProfiles,
    modifyUsers,
    pullUserByID,
    removeUser,
    logoutUser,
};
