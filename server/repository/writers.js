const { pool } = require('./repository')

const newWriter = {
    text: "insert into writers(writer) values('$1');",
    values: []
}