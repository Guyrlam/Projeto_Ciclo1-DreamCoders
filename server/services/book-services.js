/* eslint-disable no-await-in-loop */
const { pool, begin, commit, rollback } = require('../repository/repository');
const { newBook, selectBook, bookImages } = require('../repository/books');
const { newImage, selectByName } = require('../repository/images');

async function addBook(data, images, info) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        begin(client);

        // retorna o uuid do usuário
        const userID = info.user_id;

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

        // adiciona usuário ao banco de dados
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

module.exports = { addBook };
