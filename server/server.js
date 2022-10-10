const express = require('express');
const cookieParser = require('cookie-parser');
const { userRoute } = require('./routes/user-router');
const { bookRoute } = require('./routes/book-router');
const { adminRoute } = require('./routes/admin-router');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', express.static(`./public/`));
app.use('/uploads', express.static(`./server/images/uploads/`));
app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/admin', adminRoute);

// server
app.listen(process.env.NDPORT, () => {
    // eslint-disable-next-line no-console
    console.log(
        `Server started at http://${process.env.NDHOST}:${process.env.NDPORT}`
    );
});

module.exports = { app };
