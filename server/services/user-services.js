const { pool, begin, commit, rollback } = require('../repository/repository');
const { checkUser, insertUser } = require('../repository/users');
const { newImage, selectByName } = require('../repository/images');
const { selectClassID } = require('../repository/classes');

async function addUser(data, image) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        if (!data || !image) {
            response.Error = 'Não foi possível ler os dados informados';
            response.status = 400;
        } else if (
            !data.name ||
            typeof data.name !== 'string' ||
            data.name.length < 5
        ) {
            response.Error = 'Nome inválido';
            response.status = 400;
        } else if (
            !data.email ||
            typeof data.email !== 'string' ||
            data.email.length < 5 ||
            data.email.includes('@') === false
        ) {
            response.Error = 'Email inválido';
            response.status = 400;
        } else if (
            !data.telephone ||
            typeof data.telephone !== 'string' ||
            data.telephone.length < 10
        ) {
            response.Error = 'Telefone inválido';
            response.status = 400;
        } else if (
            !data.class ||
            (data.class !== 'cliente' && data.class !== 'administrador')
        ) {
            response.Error = 'Tipo de usuário inválido';
            response.status = 400;
        } else {
            begin(client);

            // verificar se o usuário existe
            const userData = await checkUser(client);
            userData.forEach((el) => {
                if (data.email === el.email) {
                    response.Error = 'O email informado já está em uso';
                    response.status = 400;
                } else if (data.telephone === el.telephone) {
                    response.Error = 'O telefone informado já está em uso';
                    response.status = 400;
                }
            });

            // insere a imagem na tabela
            await newImage(image.filename, image.path, client);

            // retorna o uuid da imagem
            const imageID = await selectByName('id', image.filename, client);

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
            await insertUser(userArray);

            commit(client);
        }
    } catch (error) {
        response.Error = error;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

module.exports = { addUser };
