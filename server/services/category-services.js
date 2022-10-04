const { newCategory } = require('../repository/categories');

async function addCategory(data) {
    const array = [data.name];
    await newCategory(array);
    return 'Categoria adicionada com sucesso!';
}

module.exports = { addCategory };