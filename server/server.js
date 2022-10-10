const express = require('express');
const cookieParser = require('cookie-parser');
const { userRoute } = require('./routes/user-router');
const { bookRoute } = require('./routes/book-router');
const { adminRoute } = require('./routes/admin-router');
const { swapRoute } = require('./routes/swap-router');
const { verifyAdmToken } = require('./middlewares/login');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/', express.static(`./public/`));
app.use('/storage', express.static(`./server/images/storage/`));
app.use('/uploads', verifyAdmToken, express.static(`./server/images/uploads/`));
app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/admin', adminRoute);
app.use('/swap', swapRoute);

// server
app.listen(process.env.NDPORT, () => {
    // eslint-disable-next-line no-console
    console.log('\x1b[4;7;34m%s\x1b[0m', `Server started at http://${process.env.NDHOST}:${process.env.NDPORT}`,
    );
});

module.exports = { app };
