const bcrypt = require('bcrypt');
const { checkUser, checkPending } = require('../repository/users');

async function dataBaseVerification(email, telephone, client) {
    const response = {
        Error: null,
    };

    try {
        const pendings = await checkPending(client);
        pendings.forEach((el) => {
            if (email === el.email) {
                response.Error =
                    'O email informado já está registrado em um perfil que está aguardando autorização para uso';
                response.status = 400;
            }
            if (telephone === el.telephone) {
                response.Error =
                    'O telefone informado já está registrado em um perfil que está aguardando autorização para uso';
                response.status = 400;
            }
        });
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

// verificações para logar usuários
function logVerification(data) {
    try {
        if (
            !data.email ||
            typeof data.email !== 'string' ||
            data.email.length < 5 ||
            data.email.includes('@') === false
        ) {
            throw new Error('Email inválido');
        } else if (
            !data.password ||
            typeof data.password !== 'string' ||
            data.password.length < 6
        ) {
            throw new Error('Senha inválida. Utilize ao menos 6 caracteres.');
        }

        return true;
    } catch (error) {
        return error.message;
    }
}

async function logDBVerification(email, password, client) {
    const response = {
        Error: null,
    };

    let selected;

    try {
        const userData = await checkUser(client);
        userData.forEach((el) => {
            if (email === el.email) {
                selected = el;
            }
        });

        if (selected === undefined) {
            response.Error =
                'Email ou senha incorretos. Caso o cadastro deste perfil tenha sido realizado recentemente aguarde a autorização dos administradores para poder usá-lo.';
            response.status = 404;
        } else {
            const compare = await bcrypt.compare(password, selected.password);
            if (!compare) {
                response.Error =
                    'Email ou senha incorretos. Caso o cadastro deste perfil tenha sido realizado recentemente aguarde a autorização dos administradores para poder usá-lo.';
                response.status = 404;
            }
        }
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
    }

    return response;
}

async function userVerification(userId, newClass, token) {
    const response = {
        Error: null,
    };

    try {
        if (token.class !== 'administrador' && token.user_id !== userId) {
            response.Error = 'Operação não autorizada';
            response.status = 401;
        }
        if (token.class !== 'administrador' && newClass !== 'cliente') {
            response.Error = 'Operação não autorizada';
            response.status = 401;
        }
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
    }

    return response;
}

module.exports = {
    dataBaseVerification,
    logVerification,
    logDBVerification,
    userVerification,
};
