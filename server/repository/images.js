const insert = {
    text: 'INSERT INTO Images(file_name, file_path) VALUES($1, $2)',
    values: [],
};

const select = {
    text: `SELECT 
    id 
    FROM Images
    WHERE file_name = $1`,
    values: [],
};

async function newImage(name, path, client) {
    insert.values = [name, path];
    await client.query(insert);
}

async function selectByName(filename, client) {
    select.values = [filename];
    const response = await client.query(select);
    return response.rows[0].id;
}

module.exports = { newImage, selectByName };
