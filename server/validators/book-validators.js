function addUserVerification(data, image) {
    try {
        if (!data || !image) {
            throw new Error('Não foi possível ler os dados informados');
        } else if (
            !data.name ||
            typeof data.name !== 'string' ||
            data.name.length < 3
        ) {
            throw new Error('Nome inválido');
        } else if (
            !data.details ||
            typeof data.details !== 'string' ||
            data.details.length < 5
        ) {
            throw new Error('Campo de detalhes inválido');
        } else if (
            !data.publisher ||
            typeof data.publisher !== 'string' ||
            data.publisher.length < 3
        ) {
            throw new Error('Editora inválida');
        } else if (
            !data.writer ||
            typeof data.writer !== 'string' ||
            data.writer.length < 3
        ) {
            throw new Error('Escritor(a) inválido');
        } else if (
            !data.condition ||
            (data.condition !== 'antigo' && data.condition !== 'novo' && data.condition !== 'seminovo')
        ) {
            throw new Error('Tipo de usuário inválido');
        } else if (
            !data.category ||
            typeof data.category !== 'string' ||
            data.category.length < 3
        ) {
            throw new Error('Categoria inválida');
        } else if (
            !data.synopsis ||
            typeof data.synopsis !== 'string' ||
            data.synopsis.length < 5
        ) {
            throw new Error('Sinopse inválida');
        }

        return true;
    } catch (error) {
        return error.message;
    }
}

module.exports = { addUserVerification };