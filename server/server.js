const express = require('express');
const multer = require('multer');
require('dotenv').config();

const app = express();
const { NDPORT, NDHOST } = process.env;

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/uploads/`);
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
});

const upload = multer({
    storage: diskStorage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', upload.single('user-image'), (req, res) => {
    console.log(req.file);
    /* console.log(req.foto); */
    res.json({ response: 'ok' });
});

app.listen(NDPORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://${NDHOST}:${NDPORT}`);
});

module.exports = { app };
