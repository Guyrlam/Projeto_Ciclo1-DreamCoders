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
                <input type="text" name="book-title" id="book-title">

                <label for="book-detail">
                    Detalhes:
                </label>
                <input type="text" name="book-details" id="book-detail">

                <label for="publisher">
                    Editora:
                </label>
                <select name="Editora" id="publisher">
                    <option value="" selected disabled>(selecione)</option>
                    <option value="Zahar">Zahar</option>
                    <option value="Saraiva">Saraiva</option>
                    <option value="Scipione">Scipione</option>
                </select>

                <label for="writer">
                    Escritor:
                </label>
                <select name="Escritor" id="writer">
                    <option value="" selected disabled>(selecione)</option>
                    <option value="Arthur Conan Doyle">Arthur Conan Doyle</option>
                    <option value="Augusto Cury">Augusto Cury</option>
                    <option value="Eckhart Tolle">Eckhart Tolle</option>
                </select>

                <label for="category">
                    Categoria:
                </label>
                <select name="Categoria" id="category">
                    <option value="" selected disabled>(selecione)</option>
                    <option value="autoajuda">Autoajuda</option>
                    <option value="misterio">Mistério</option>
                </select>

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
                <input type="text" name="book-synopsis" id="synopsis">

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
