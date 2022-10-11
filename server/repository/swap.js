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
    concluded_at,
    book_id_collector_deleted_at,
    change_for_collector_deleted_at
    FROM exchanges
    WHERE id = $1`,
    values: [],
};

const list = {
    text: `SELECT 
    id,
    book_id,
    change_for,
    requested_at,
    accepted_at,
    rejected_at,
    concluded_at,
    book_id_collector_deleted_at,
    change_for_collector_deleted_at
    FROM exchanges`,
};

const approve = {
    text: 'UPDATE exchanges SET accepted_at = now() WHERE id = $1',
    values: [],
};

const reject = {
    text: 'UPDATE exchanges SET rejected_at = now() WHERE id = $1',
    values: [],
};

const concluded = {
    text: 'UPDATE exchanges SET concluded_at = now() WHERE id = $1',
    values: [],
};

const deletedBookID = {
    text: 'UPDATE exchanges SET book_id_collector_deleted_at = now() WHERE id = $1',
    values: [],
};

const deletedChangeFOR = {
    text: 'UPDATE exchanges SET change_for_collector_deleted_at = now() WHERE id = $1',
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

async function exchangeList(client) {
    const response = await client.query(list);
    return response.rows;
}

async function approveSwap(exchangeID, client) {
    approve.values = [exchangeID];
    await client.query(approve);
}

async function rejectSwap(exchangeID, client) {
    reject.values = [exchangeID];
    await client.query(reject);
}

async function deleteBookIDSwap(exchangeID, client) {
    deletedBookID.values = [exchangeID];
    await client.query(deletedBookID);
}

async function deleteChangeFORSwap(exchangeID, client) {
    deletedChangeFOR.values = [exchangeID];
    await client.query(deletedChangeFOR);
}

async function concludeSwap(exchangeID, client) {
    concluded.values = [exchangeID];
    await client.query(concluded);
}

module.exports = {
    newRequest,
    exchangeDetails,
    approveSwap,
    rejectSwap,
    concludeSwap,
    deleteBookIDSwap,
    deleteChangeFORSwap,
    exchangeList,
};
