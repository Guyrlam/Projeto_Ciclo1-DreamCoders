const { newImage } = require('../repository/images');

async function addImage(data) {
    const array = [data.filename, data.path];
    await newImage(array);
    return 'Usuário adicionado com sucesso!';
}

module.exports = { addImage };
