const { Client, Pool } = require('pg')

const pool = new Pool({
    user: "DreamCoders",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

module.exports = client