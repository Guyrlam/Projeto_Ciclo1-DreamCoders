const { pool } = require('./repository');

const insert = {
    text: 'INSERT INTO Images(file_name, file_path) VALUES($1, $2)',
    values: [],
};

async function newImage(array) {
    insert.values = array;
    await pool.query(insert);
}

module.exports = { newImage };
