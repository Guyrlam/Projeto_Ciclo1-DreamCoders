const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user_info = decode;
        next();
    } catch (error) {
        res.status(401).send({ mensagem: 'Fala na autenticação do token' });
    }
}

module.exports = { verifyToken };
