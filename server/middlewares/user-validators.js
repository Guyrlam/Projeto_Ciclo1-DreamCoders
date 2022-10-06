// verificações para adicionar usuários
function addUserVerification(req, res, next) {
    try {
        if (!req.body || !req.file) {
            throw new Error('Não foi possível ler os dados informados');
        } else if (
            !req.body.name ||
            typeof req.body.name !== 'string' ||
            req.body.name.length < 5
        ) {
            throw new Error('Nome inválido');
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
            throw new Error('Telefone inválido');
        } else if (
            !req.body.class ||
            (req.body.class !== 'cliente' && req.body.class !== 'administrador')
        ) {
            throw new Error('Tipo de usuário inválido');
        } else if (
            !req.body.password ||
            typeof req.body.password !== 'string' ||
            req.body.password.length < 6
        ) {
            throw new Error('Senha inválida');
        }

        next();
    } catch (error) {
        const response = {
            ERROR: error.message,
        };
        res.status(400).json(response);
    }
}

module.exports = { addUserVerification };
