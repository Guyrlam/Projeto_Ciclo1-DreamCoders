const { pool } = require('./repository')

const Writer = {
    text: "insert into writers(writer) values($1);",
    values: []
}

async function newWriter(array){
    Writer.values = array
    await pool.query(Writer)

}

module.exports = { newWriter }