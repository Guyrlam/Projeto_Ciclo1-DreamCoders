const express = require('express');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const { userRoute } = require('./routes/user-router');
const { bookRoute } = require('./routes/book-router');
require('dotenv').config();

const app = express();
const { NDPORT, NDHOST } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// multer configurations
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./server/uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
});

const imageFilter = (re, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: diskStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: imageFilter,
});

// routes
app.use('/uploads', express.static(`./server/uploads/`));
app.use('/user', upload.single('image'), userRoute);
app.use('/book', upload.array('image', 4), bookRoute);

// server
app.listen(NDPORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://${NDHOST}:${NDPORT}`);
});

module.exports = { app, upload };
