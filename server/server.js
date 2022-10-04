const express = require('express');
const multer = require('multer');
require('dotenv').config();

const { imagesRoute } = require('./routes/image-router');
const { publisherRoute } = require('./routes/publisher-router');
const { writerRoute } = require('./routes/writer-route')
const { categoryRoute } = require('./routes/category-route')

const app = express();
const { NDPORT, NDHOST } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/uploads', express.static(`./server/uploads/`));
app.use('/images', upload.single('image'), imagesRoute);
app.use('/publisher', publisherRoute)
app.use('/writers', writerRoute)
app.use('/categories', categoryRoute)

app.listen(NDPORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://${NDHOST}:${NDPORT}`);
});


module.exports = { app, upload };
