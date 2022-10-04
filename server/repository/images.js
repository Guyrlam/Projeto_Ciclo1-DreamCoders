const insert = {
    text: 'INSERT INTO Images(file_name, file_path) VALUES($1, $2)',
    values: [],
};

const select = {
    text: `SELECT 
    $1 
    FROM Images
    WHERE filename = $2`,
    values: [],
};

async function newImage(name, path, client) {
    insert.values = [name, path];
    await client.query(insert);
}

async function selectByName(property, filename, client) {
    select.values = [property, filename];
    await client.query(select);
}

module.exports = { newImage, selectByName };
