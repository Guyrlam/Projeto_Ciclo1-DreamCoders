const express = require('express');
require('dotenv').config();

const app = express();
const { PORT, HOST } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://${HOST}:${PORT}`);
});

module.exports = { app };
