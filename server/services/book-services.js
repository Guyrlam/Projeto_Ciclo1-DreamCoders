/* eslint-disable no-await-in-loop */
const jwt = require('jsonwebtoken');
const { pool, begin, commit, rollback } = require('../repository/repository');
const {
    newBook,
    selectBook,
    bookImages,
    bookList,
    updateBook,
} = require('../repository/books');
const {
    newImage,
    selectByName,
    bookImagesList,
    deleteBookImages,
} = require('../repository/images');
const { collectorVerification } = require('../validators/book-validators');

async function addBook(data, images, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        begin(client);

        // retorna o uuid do usuário
        const userID = token.user_id;

        const bookArray = [
            data.name,
            data.details,
            userID,
            data.publisher,
            data.writer,
            data.condition,
            data.category,
            data.synopsis,
        ];

        // adiciona livro ao banco de dados
        await newBook(bookArray, client);

        // encontra o id do livro
        const bookID = await selectBook(data.name, userID, client);

        // insere as imagens na tabela
        for (let i = 0; i < images.length; i += 1) {
            const el = images[i];
            await newImage(el.filename, el.path, client);
            const imageID = await selectByName(el.filename, client);
            await bookImages(imageID, bookID, client);
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

async function pullBooks(token) {
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

        // lista os dados dos livros
        const books = await bookList(client);

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

async function modifyBooks(bookId, data, images, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        begin(client);

        // verificar se o id do usuário é o mesmo do colecionador
        const verifiedUser = await collectorVerification(bookId, token, client);
        if (verifiedUser.Error !== null) {
            rollback(client);
            client.release();
            return verifiedUser;
        }

        const bookArray = [
            data.name,
            data.details,
            data.publisher,
            data.writer,
            data.condition,
            data.category,
            data.synopsis,
            bookId,
        ];

        // altera os dados do livro
        await updateBook(bookArray, client);

        // deleta imagens
        if (data.deleted_images) {
            await deleteBookImages(data.deleted_images, client);
        }

        // insere as novas imagens na tabela
        if (images) {
            for (let i = 0; i < images.length; i += 1) {
                const el = images[i];
                await newImage(el.filename, el.path, client);
                const imageId = await selectByName(el.filename, client);
                await bookImages(imageId, bookId, client);
            }
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

module.exports = { addBook, pullBooks, modifyBooks };
