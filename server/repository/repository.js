const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

async function begin(client) {
    await client.query('BEGIN');
}

async function commit(client) {
    await client.query('COMMIT');
}

async function rollback(client) {
    await client.query('ROLLBACK');
}

module.exports = { pool, begin, commit, rollback };
