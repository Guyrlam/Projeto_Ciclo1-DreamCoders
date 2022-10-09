const { getBookByID } = require('../repository/books');

async function collectorVerification(bookId, token, client) {
    const response = {
        Error: null,
    };

    try {
        const bookData = await getBookByID(bookId, client);
        if (
            token.class !== 'administrador' &&
            bookData.collector_id !== token.user_id
        ) {
            response.Error = 'Operação não autorizada';
            response.status = 401;
        }
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
    }

    return response;
}

module.exports = { collectorVerification };
