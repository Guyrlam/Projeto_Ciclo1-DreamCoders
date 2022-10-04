const { newPublisher } = require('../repository/publishers');

async function addPublisher(data) {
    const array = [data.name];
    await newPublisher(array);
    return 'Editora adicionada com sucesso!';
}

module.exports = { addPublisher };
