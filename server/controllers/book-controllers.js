const { addBook, pullBooks } = require('../services/book-services');

async function insertBook(req, res) {
    const services = await addBook(req.body, req.files, req.user_info);
    if (services.Error !== null) {
        res.status(services.status).json(services.Error);
    } else {
        const message = {
            message: 'Livro adicionado com sucesso',
        };

        res.status(200).json(message);
    }
}

async function listBooks(req, res) {
    const services = await pullBooks();
    if (services.Error !== null) {
        res.status(services.status).json(services.Error);
    } else {
        const message = {
            data: services.data,
        };

        res.status(200).json(message);
    }
}

module.exports = { insertBook, listBooks };
