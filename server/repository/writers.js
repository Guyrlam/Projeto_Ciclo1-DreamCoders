const { pool } = require('../server')

const newWriter = {
    text: "insert into writers(writer) values('$1');",
    values: []
}