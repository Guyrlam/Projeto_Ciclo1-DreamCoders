const { pool, begin, commit, rollback } = require('../repository/repository');
const { newBook, selectBook, bookImages } = require('../repository/books');
const { newImage, selectByName } = require('../repository/images');
const { addBookVerification } = require('../validators/book-validators');

async function addBook(data, images, info) {
    const response = {
        Error: null,
    };

    let client;

    try {
        const verifiedData = addBookVerification(data, images);
        if (verifiedData !== true) {
            response.Error = verifiedData;
            response.status = 400;
            return response;
        }

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

        // insere as imagens na tabela e seleciona seu id
        const id = [];
        images.forEach(async (el) => {
            await newImage(el.filename, el.path);
            const imageID = await selectByName(el.filename, client);
            id.push(imageID);
        });

        // insere os dados na tabela de imagens de livros
        id.forEach(async (image) => {
            await bookImages(image, bookID, client);
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

module.exports = { addBook };
