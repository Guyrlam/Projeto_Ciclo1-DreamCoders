const { pool, begin, commit, rollback } = require('../repository/repository');
const { insertUser } = require('../repository/users');
const { newImage, selectByName } = require('../repository/images');
const { selectClassID } = require('../repository/user-classes');
const { addBookVerification } = require('../validators/book-validators');

async function addBook(data, image) {
    const response = {
        Error: null,
    };

    let client;

    try {
        const verifiedData = addBookVerification(data, image);
        if (verifiedData !== true) {
            response.Error = verifiedData;
            response.status = 400;
            return response;
        }

        client = await pool.connect();

        begin(client);

        // insere a imagem na tabela
        await newImage(image.filename, image.path, client);

        // retorna o uuid da imagem
        const imageID = await selectByName(image.filename, client);

        // retorna o uuid do tipo de usuário
        const classID = await selectClassID(data.class, client);

        const userArray = [
            data.name,
            imageID,
            classID,
            data.email,
            data.telephone,
            data.password,
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

module.exports = { addBook };
