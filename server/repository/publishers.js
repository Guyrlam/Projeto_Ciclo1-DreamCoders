const { pool } = require('./repository')

const Publisher = {
    text: "insert into publishers(publisher) values($1);",
    values: []
}

async function newPublisher(array){
    Publisher.values = array
    await pool.query(Publisher)
}

module.exports = { newPublisher }