const { pool } = require('./repository')

const newPublisher = {
    text: "insert into publishers(publisher) values('$1');",
    values: []
}