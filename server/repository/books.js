const insert = {
    text: 'INSERT INTO Book(name, details, user_id, publisher, writer, condition, category, synopsis) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    values: [],
};

const select = {
    text: `SELECT 
    id 
    FROM Book
    WHERE name = $1
    AND user_id = $2`,
    values: [],
};

const images = {
    text: 'INSERT INTO Book_images(image_id, book_id) VALUES($1, $2)',
    values: [],
};

async function newBook(array, client) {
    insert.values = [array];
    await client.query(insert);
}

async function selectBook(name, user, client) {
    select.values = [name, user];
    const response = await client.query(select);
    return response.rows[0].id;
}

async function bookImages(image, book, client) {
    images.values = [image, book];
    await client.query(images);
}

module.exports = { newBook, selectBook, bookImages };
