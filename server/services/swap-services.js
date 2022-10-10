/* eslint-disable no-await-in-loop */
const jwt = require('jsonwebtoken');
const { pool, begin, commit, rollback } = require('../repository/repository');
const {
    newRequest,
    exchangeDetails,
    approveSwap,
    rejectSwap,
    concludeSwap,
    deleteSwap,
} = require('../repository/swap');
const { collectorVerification } = require('../validators/book-validators');
const { changeCollector } = require('../repository/books');

async function createRequest(data, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        begin(client);

        // verificar se o id do usuário é o mesmo do colecionador
        const verifiedUser = await collectorVerification(
            data.book_id,
            token,
            client
        );
        if (verifiedUser.Error !== null) {
            rollback(client);
            client.release();
            return verifiedUser;
        }

        const requestArray = [data.book_id, data.change_for];

        // adiciona livro ao banco de dados
        await newRequest(requestArray, client);

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function respRequest(rate, exchangeID, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        begin(client);

        const data = await exchangeDetails(exchangeID, client);

        // verificar se o id do usuário é o mesmo do colecionador
        const verifiedUser = await collectorVerification(
            data.book_id,
            token,
            client
        );
        if (verifiedUser.Error !== null) {
            rollback(client);
            client.release();
            return verifiedUser;
        }

        if (rate === 'approved') {
            await approveSwap(exchangeID, client);
        } else if (rate === 'rejected') {
            await rejectSwap(exchangeID, client);
        } else {
            rollback(client);
            response.Error = 'Operação não identificada';
            response.status = 400;
            return response;
        }

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function concludeRequest(exchangeID, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        begin(client);

        const data = await exchangeDetails(exchangeID, client);

        // verificar se o id do usuário é o mesmo do colecionador
        const verifiedUser = await collectorVerification(
            data.book_id,
            token,
            client
        );
        if (verifiedUser.Error !== null) {
            rollback(client);
            client.release();
            return verifiedUser;
        }

        if (data.rejected_at != null) {
            rollback(client);
            response.Error = 'Não é possível concluir uma troca rejeitada';
            response.status = 400;
            return response;
        }

        // finaliza a troca
        await concludeSwap(exchangeID, client);

        // altera as coleções dos livros
        await changeCollector(data.book_id, data.change_for, client);

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

async function deleteRequest(exchangeID, token) {
    const response = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        response.token = jwt.sign(token, process.env.JWT_KEY, {
            expiresIn: 3600,
        });

        begin(client);

        const data = await exchangeDetails(exchangeID, client);

        if (data.rejected_at != null && data.concluded_at != null) {
            rollback(client);
            response.Error =
                'Não é possível deletar uma troca que não foi concluída ou rejeitada';
            response.status = 400;
            return response;
        }

        // deleta a requisição
        await deleteSwap(exchangeID, client);

        commit(client);
    } catch (error) {
        response.Error = error.message;
        response.status = 500;
        rollback(client);
    }

    client.release();
    return response;
}

module.exports = { createRequest, respRequest, concludeRequest, deleteRequest };
