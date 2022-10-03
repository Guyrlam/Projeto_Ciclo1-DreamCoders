const { pool } = require('../server')

const newUserClass = {
    text: "insert into userClass(userClass) values($1);",
    values: []
}