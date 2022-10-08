const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user_info = {
            user_id: decode.user_id,
            user_name: decode.user_name,
            description: decode.description,
            email: decode.email,
            telephone: decode.telephone,
            class: decode.class,
            file_name: decode.file_name,
        };
        next();
    } catch (error) {
        res.status(401).send({ mensagem: 'Falha na autenticação do token' });
    }
}

function optionalToken(req, res, next) {
    try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user_info = {
            user_id: decode.user_id,
            user_name: decode.user_name,
            description: decode.description,
            email: decode.email,
            telephone: decode.telephone,
            class: decode.class,
            file_name: decode.file_name,
        };
    } catch (error) {
        req.user_info = null;
    }

    next();
}

module.exports = { verifyToken, optionalToken };
