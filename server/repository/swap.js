const insert = {
    text: 'INSERT INTO exchanges(book_id, change_for, requested_at) VALUES($1, $2, now())',
    values: [],
};

const select = {
    text: `SELECT 
    book_id,
    change_for,
    requested_at,
    accepted_at,
    rejected_at,
    concluded_at
    FROM exchanges
    WHERE id = $1
    AND deleted_at isnull`,
    values: [],
};

const approve = {
    text: 'UPDATE exchanges SET accepted_at = now() WHERE id = $1',
    values: [],
};

const reject = {
    text: 'UPDATE exchanges SET rejected_at = now() WHERE id = $1',
    values: [],
};

async function newRequest(array, client) {
    insert.values = array;
    await client.query(insert);
}

async function exchangeDetails(exchangeID, client) {
    select.values = [exchangeID];
    const response = await client.query(select);
    return response.rows[0];
}

async function approveSwap(exchangeID, client) {
    approve.values = [exchangeID];
    await client.query(approve);
}

async function rejectSwap(exchangeID, client) {
    reject.values = [exchangeID];
    await client.query(reject);
}

module.exports = { newRequest, exchangeDetails, approveSwap, rejectSwap };
