const { pool } = require('./repository')

const newCategory = {
    text: "insert into categories(category) values($1);",
    values: []
}
