// verificações para adicionar usuários
function passwordVerification(req, res, next) {
    try {
        if (
            !req.body.password ||
            typeof req.body.password !== 'string' ||
            req.body.password.length < 6
        ) {
            throw new Error('Senha inválida. Utilize ao menos 6 caracteres.');
        }

        next();
    } catch (error) {
        const response = {
            ERROR: error.message,
        };
        res.status(400).json(response);
    }
}

function userVerification(req, res, next) {
    try {
        if (!req.body) {
            throw new Error('Não foi possível ler os dados informados');
        } else if (!req.image) {
            throw new Error('Adicione uma imagem.');
        } else if (
            !req.body.name ||
            typeof req.body.name !== 'string' ||
            req.body.name.length < 5
        ) {
            throw new Error('Nome inválido. Utilize ao menos 5 caracteres.');
        } else if (
            !req.body.email ||
            typeof req.body.email !== 'string' ||
            req.body.email.length < 5 ||
            req.body.email.includes('@') === false
        ) {
            throw new Error('Email inválido');
        } else if (
            !req.body.telephone ||
            typeof req.body.telephone !== 'string' ||
            req.body.telephone.length < 10
        ) {
            throw new Error('Telefone inválido. Utilize ao menos 10 algarismos.');
        } else if (
            !req.body.class ||
            (req.body.class !== 'cliente' && req.body.class !== 'administrador')
        ) {
            throw new Error('Tipo de usuário inválido');
        }

        next();
    } catch (error) {
        const response = {
            ERROR: error.message,
        };
        res.status(400).json(response);
    }
}

module.exports = { userVerification, passwordVerification };
