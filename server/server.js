const express = require('express');
const cookieParser = require('cookie-parser');
const { userRoute } = require('./routes/user-router');
const { bookRoute } = require('./routes/book-router');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', express.static(`./public/`));
app.use('/uploads', express.static(`./server/uploads/`));
app.use('/user', userRoute);
app.use('/book', bookRoute);

// server
app.listen(process.env.NDPORT, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Server started at http://${process.env.NDHOST}:${process.env.NDPORT}`
    );
});

module.exports = { app };
