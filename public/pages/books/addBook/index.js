export default () => {
    console.log('add book');
    const container = document.createElement('div');

    const template = `
    <section id="addbook">
    <div id="addbook-images">
        <img src="" alt="" width="100px" height="100px" class="addbook-image">
        <img src="" alt="" width="100px" height="100px" class="addbook-image">
        <img src="" alt="" width="100px" height="100px" class="addbook-image">
        <input type="file" name="" id="file-photo-addbook" class="addbook-image">
    </div>
    <div id="addbook-details">
        <div id="addbook-inputs">
            <div>
                <label for="book-name">Nome do Livro: </label>
                <input type="text" name="" id="addbook-name" class="addbook-text-inputs">
            </div>

            <div>
                <label for="">Detalhes: </label>
                <input type="text" name="" id="addbook-description" class="addbook-text-inputs">
            </div>

            <div>
                <label for="">Editora: </label>
                <select name="" id="addbook-publisher">Editora</select>
            </div>

            <div>
                <label for="">Escritor: </label>
                <select name="" id="addbook-writer">Escritor</select>
            </div>

            <div>
                <label for="">Condições: </label>
                <select name="" id="addbook-conditions">Condições</select>
            </div>

            <div>
                <label for="">Sinopse: </label>
                <input type="text" name="" id="addbook-synopsis" class="addbook-text-inputs">
            </div>

            <div>
                <label for="disponivel">Disponivel: </label>
                <input type="checkbox" name="disponivel" id="addbook-enable">
            </div>

        </div>
        <div id="addbook-buttons">
            <button id="addbook-save">Salvar</button>
            <button id="delete-book">Excluir Livro</button>
        </div>
    </div>
</section>



    `;
    container.innerHTML = template;
    return container;
};
