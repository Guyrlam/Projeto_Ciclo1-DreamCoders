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

const list = {
    text: `SELECT 
    images.file_name fileName
    FROM book_images
    INNER JOIN images
    ON images.id = book_images.image_id
    WHERE book_id = $1`,
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

async function bookImagesList(book, client) {
    list.values = [book];
    const response = await client.query(list);
    return response.rows;
}

module.exports = { newImage, selectByName, bookImagesList };
