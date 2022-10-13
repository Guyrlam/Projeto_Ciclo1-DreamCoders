export default () => {
    console.log('add book');
    const container = document.createElement('div');

    const template =
        `
        <section id="editBook">
            <div>
                <h2>
                    Cadastrar novo livro
                </h2>
            </div>
            <div id="blocks">
            
                <label for="book-title">
                    Título do Livro:
                </label>
                <input type="text" name="book-title" id="book-title" class="inputs-addBook">

                <label for="book-detail">
                    Detalhes:
                </label>
                <input type="text" name="book-details" id="book-detail" class="inputs-addBook">

                <label for="publisher">
                    Editora:
                </label>
                <input type="text" name="Editora" id="publisher" class="inputs-addBook">

                </input>

                <label for="writer">
                    Escritor:
                </label>
                <input type="text" name="Escritor" id="writer" class="inputs-addBook">

                </input>

                <label for="category">
                    Categoria:
                </label>
                <input type="text" name="Categoria" id="category" class="inputs-addBook">
                </input>

                <fieldset title="Estado do livro." id="conditions">
                    <label for="conditions">
                        Condições do livro: 
                    </label>
                    <input type="radio" name="book-conditions" class="book-conditions" id="conditions-antigo" value="antigo">
                    <span>
                            antigo
                    </span>
                    <input type="radio" name="book-conditions" class="book-conditions" id="conditions-novo" value="novo">
                    <span>
                            novo
                    </span>
                    <input type="radio" name="book-conditions" class="book-conditions" id="conditions-semi" value="seminovo">
                    <span>
                            seminovo
                    </span>
                </fieldset>

                <label for="synopsis">
                    Sinopse:
                </label>
                <input type="text" name="book-synopsis" id="synopsis" class="inputs-addBook">

                <div id="div-input-photo-book">
                    <label for="pic-profile">
                        Foto da capa do livro: 
                    </label>
                    <input type="file" accept="image/jpeg,image/png,image/svg+xml" name="" id="input-book-photo">
                </div>

                <button id="save-new-book-button">
                    Salvar
                </button>
            </div>
        </section>
        `;
    container.innerHTML = template;
    return container;
};
