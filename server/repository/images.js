/* eslint-disable no-await-in-loop */
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

const deleted = {
    text: 'UPDATE images SET deleted_at = now() WHERE id = $1',
    values: [],
};

const deletedBook = {
    text: 'DELETE FROM book_images WHERE book_id = $1',
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

async function deleteBookImages(images, client) {
    for (let i = 0; i < images.length; i += 1) {
        // eslint-disable-next-line prettier/prettier
        const fileName = (images[i] - `http://${process.env.NDHOST}:${process.env.NDPORT}/uploads/`);
        select.values = [fileName];
        const fileID = await client.query(select);
        deleted.values = [fileID];
        await client.query(deleted);
        deletedBook.values = [fileID];
        await client.query(deletedBook);
    }
}

module.exports = { newImage, selectByName, bookImagesList, deleteBookImages };
