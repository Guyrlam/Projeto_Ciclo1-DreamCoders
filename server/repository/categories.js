const { pool } = require('./repository')

const Category = {
    text: "insert into categories(category) values($1);",
    values: []
}

async function newCategory(array){
    Category.values = array
    await pool.query(Category)
} 

module.exports = { newCategory }