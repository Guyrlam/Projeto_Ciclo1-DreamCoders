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
    WHERE book.deleted_at isnull
    AND book.approved = true`,
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
	AND book.deleted_at isnull
    AND book.approved = true`,
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
	AND book.deleted_at isnull
    AND book.approved = true`,
    values: [],
};

const update = {
    text: 'UPDATE book SET name = $1, details = $2, publisher = $3, writer = $4, condition = $5, category = $6, synopsis = $7, updated_at = now() WHERE id = $8',
    values: [],
};

const collector = {
    text: 'UPDATE book SET user_id = $1, updated_at = now() WHERE id = $2',
    values: [],
};

const deleted = {
    text: 'UPDATE book SET deleted_at = now() WHERE id = $1',
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

async function changeCollector(bookID, changeID, client) {
    // Colecionador1
    selectedBook.values = [bookID];
    const book = await client.query(selectedBook);
    const bookCollectorID = book.rows[0].collector_id;
    // Colecionador 2
    selectedBook.values = [changeID];
    const change = await client.query(selectedBook);
    const changeCollectorID = change.rows[0].collector_id;
    // Alterações
    collector.values = [bookCollectorID, changeID];
    await client.query(collector);
    collector.values = [changeCollectorID, bookID];
    await client.query(collector);
}

async function removeByID(bookID, client) {
    deleted.values = [bookID];
    await client.query(deleted);
}

module.exports = {
    newBook,
    selectBook,
    bookImages,
    bookList,
    userBookList,
    getBookByID,
    updateBook,
    removeByID,
    changeCollector,
};
