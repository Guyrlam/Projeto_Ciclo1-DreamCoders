function bookVerification(req, res, next) {
    try {
        if (!req.body) {
            throw new Error('Não foi possível ler os dados informados');
        } else if (!req.image) {
            throw new Error('Adicione uma imagem.');
        } else if (
            !req.body.name ||
            typeof req.body.name !== 'string' ||
            req.body.name.length < 3
        ) {
            throw new Error('Nome inválido');
        } else if (
            !req.body.details ||
            typeof req.body.details !== 'string' ||
            req.body.details.length < 5
        ) {
            throw new Error('Campo de detalhes inválido');
        } else if (
            !req.body.publisher ||
            typeof req.body.publisher !== 'string' ||
            req.body.publisher.length < 3
        ) {
            throw new Error('Editora inválida');
        } else if (
            !req.body.writer ||
            typeof req.body.writer !== 'string' ||
            req.body.writer.length < 3
        ) {
            throw new Error('Escritor(a) inválido');
        } else if (
            !req.body.condition ||
            (req.body.condition !== 'antigo' &&
                req.body.condition !== 'novo' &&
                req.body.condition !== 'seminovo')
        ) {
            throw new Error(
                'Condição inválida, esclareça se o livro é antigo, novo ou seminovo'
            );
        } else if (
            !req.body.category ||
            typeof req.body.category !== 'string' ||
            req.body.category.length < 3
        ) {
            throw new Error('Categoria inválida');
        } else if (
            !req.body.synopsis ||
            typeof req.body.synopsis !== 'string' ||
            req.body.synopsis.length < 5
        ) {
            throw new Error('Sinopse inválida');
        }

        next();
    } catch (error) {
        const response = {
            ERROR: error.message,
        };
        res.status(400).json(response);
    }
}

module.exports = { bookVerification };
