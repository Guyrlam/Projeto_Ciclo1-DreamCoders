const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const http = require('http');
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
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};

https.createServer(options, app).listen(process.env.NDPORT);

app.use(function (request, response) {
    if (!request.secure) {
        response.redirect(`https://${request.headers.host}:443/${request.url}`);
    }
});

console.log(
    '\x1b[3;7;38m%s\x1b[0m',
    `Server started at https://${process.env.NDHOST}:${process.env.NDPORT}`
);

module.exports = { app };
