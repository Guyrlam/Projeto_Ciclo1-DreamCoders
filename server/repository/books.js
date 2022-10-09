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
    WHERE book.deleted_at isnull`,
};

const selectedBook = {
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
    WHERE book.id = $1
	AND book.deleted_at isnull`,
    values: [],
};

const userBooks = {
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
    WHERE book.user_id = $1
	AND book.deleted_at isnull`,
    values: [],
};

const update = {
    text: 'UPDATE book SET name = $1, details = $2, publisher = $3, writer = $4, condition = $5, category = $6, synopsis = $7 , updated_at = now() WHERE id = $8',
    values: [],
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

async function userBookList(user, client) {
    userBooks.values = [user];
    const response = await client.query(userBooks);
    return response.rows;
}

async function getBookByID(bookID, client) {
    selectedBook.values = [bookID];
    const response = await client.query(selectedBook);
    return response.rows[0];
}

async function updateBook(array, client) {
    update.values = array;
    await client.query(update);
}

module.exports = {
    newBook,
    selectBook,
    bookImages,
    bookList,
    userBookList,
    getBookByID,
    updateBook,
};
