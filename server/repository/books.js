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

const books = {
    text: `SELECT
    book.id,
    book.name,
    book.details,
    user_profile.name collector,
    book.publisher,
    book.writer,
    book.condition,
    book.category,
    book.synopsis
    FROM book
    INNER JOIN user_profile
    ON user_profile.id = book.user_id
    WHERE book.approved isnull 
    OR book.approved = true`,
};

async function newBook(array, client) {
    insert.values = array;
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

async function bookList(client) {
    const response = await client.query(books);
    return response.rows;
}

module.exports = { newBook, selectBook, bookImages, bookList };
