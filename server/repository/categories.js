const { pool } = require('../server')

const newCategory = {
    text: "insert into categories(category) values($1);",
    values: []
}

