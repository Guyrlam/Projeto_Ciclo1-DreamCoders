const { pool } = require('./repository');

const users = {
    text: `SELECT
    user_profile.id,
    user_profile.name,
    user_profile.description,
    images.file_name image,
    user_classes.class,
    user_profile.email,
    user_profile.telephone
    FROM user_profile
    INNER JOIN images
    ON images.id = user_profile.image_id
    INNER JOIN user_classes
    ON user_classes.id = user_profile.class_id
    WHERE user_profile.deleted_at isnull
    AND user_profile.approved isnull`,
};

const books = {
    text: `SELECT
    book.id,
    book.name,
    book.details,
    book.user_id collector_id,
    user_profile.name collector,
    book.publisher,
    book.writer,
    book.condition,
    book.category,
    book.synopsis
    FROM book
    INNER JOIN user_profile
    ON user_profile.id = book.user_id
    WHERE book.deleted_at isnull
    AND book.approved isnull`,
};

const rejected = {
    text: `SELECT
    images.file_name image
    FROM user_profile
    INNER JOIN images
    ON images.id = user_profile.image_id
    WHERE user_profile.id = $1`,
    values: [],
};

const userUpdate = {
    text: 'UPDATE user_profile SET approved = true, updated_at = now() WHERE id = $1',
    values: [],
};

const deleteUser = {
    text: 'UPDATE user_profile SET approved = false, deleted_at = now() WHERE id = $1',
    values: [],
};

async function usersAdminList() {
    const response = await pool.query(users);
    return response.rows;
}

async function booksAdminList(client) {
    const response = await client.query(books);
    return response.rows;
}

async function approveUser(userID, client) {
    userUpdate.values = [userID];
    await client.query(userUpdate);
}

async function rejectUser(userID, client) {
    deleteUser.values = [userID];
    await client.query(deleteUser);
}

async function pullRejected(userID, client) {
    rejected.values = [userID];
    const response = await client.query(rejected);
    return response.rows[0];
}

module.exports = {
    usersAdminList,
    booksAdminList,
    approveUser,
    rejectUser,
    pullRejected,
};
