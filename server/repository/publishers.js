const { pool } = require('../server')

const newPublisher = {
    text: "insert into publishers(publisher) values('$1');",
    values: []
}