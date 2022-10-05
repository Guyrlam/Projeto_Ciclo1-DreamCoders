const { checkUser } = require('../repository/users');

function addUserVerification(data, image) {
    try {
        if (!data || !image) {
            throw new Error('Não foi possível ler os dados informados');
        } else if (
            !data.name ||
            typeof data.name !== 'string' ||
            data.name.length < 5
        ) {
            throw new Error('Nome inválido');
        } else if (
            !data.email ||
            typeof data.email !== 'string' ||
            data.email.length < 5 ||
            data.email.includes('@') === false
        ) {
            throw new Error('Email inválido');
        } else if (
            !data.telephone ||
            typeof data.telephone !== 'string' ||
            data.telephone.length < 10
        ) {
            throw new Error('Telefone inválido');
        } else if (
            !data.class ||
            (data.class !== 'cliente' && data.class !== 'administrador')
        ) {
            throw new Error('Tipo de usuário inválido');
        } else if (
            !data.password ||
            typeof data.password !== 'string' ||
            data.password.length < 6
        ) {
            throw new Error('Senha inválida');
        }

        return true;
    } catch (error) {
        return error.message;
    }
}

async function dataBaseVerification(email, telephone, client) {
    const response = {
        Error: null,
    };

    try {
        const userData = await checkUser(client);
        userData.forEach((el) => {
            if (email === el.email) {
                response.Error = 'O email informado já está em uso';
                response.status = 400;
            }
            if (telephone === el.telephone) {
                response.Error = 'O telefone informado já está em uso';
                response.status = 400;
            }
        });
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
    }

    return response;
}

module.exports = { addUserVerification, dataBaseVerification };
