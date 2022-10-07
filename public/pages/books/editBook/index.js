export default () => {
    console.log('editBook template');
    const container = document.createElement('div');

    const template = `
        <section id="editBook">
        <div>
            <h2>Alterar cadastro de livro</h2>
        </div>
        <div id="blocks">
            <form action="" method="post" style="display: flex; flex-flow: column nowrap; gap: 10px">

                <label for="book-title">Título do Livro:</label>
                <input type="text" name="book-title" id="book-title">

                <label for="book-detail">Detalhes:</label>
                <input type="text" name="book-details" id="book-detail">

                <label for="publisher">Editora:</label>
                <select name="Editora" id="publisher">
                    <option value="" selected disabled>(selecione)</option>
                    <option value="Zahar">Zahar</option>
                    <option value="Saraiva">Saraiva</option>
                    <option value="Scipione">Scipione</option>
                </select>

                <label for="writer">Escritor:</label>
                <select name="Escritor" id="writer">
                    <option value="" selected disabled>(selecione)</option>
                    <option value="Arthur Conan Doyle">Arthur Conan Doyle</option>
                    <option value="Augusto Cury">Augusto Cury</option>
                    <option value="Eckhart Tolle">Eckhart Tolle</option>
                </select>

                <label for="category">Categoria:</label>
                <select name="Categoria" id="category">
                    <option value="" selected disabled>(selecione)</option>
                    <option value="autoajuda">Autoajuda</option>
                    <option value="misterio">Mistério</option>
                </select>

                <label for="synopsis">Sinopse:</label>
                <input type="text" name="book-synopsis" id="synopsis">

                <fieldset title="Estado do livro.">
                    <span>Condições do livro: </span>
                    <label for="new">novo </label>
                    <input type="radio" name="book-conditions" id="new" value="new">
                    <label for="seminew">seminovo </label>
                    <input type="radio" name="book-conditions" id="seminew" value="semi-new">
                    <label for="old">antigo </label>
                    <input type="radio" name="book-conditions" id="old" value="old">
                </fieldset>


                <div>
                    <span>Disponível para troca?</span>
                    <div class="button b2" id="button-toggle">
                        <input type="checkbox" class="checkbox">
                        <div class="knobs">
                            <span></span>
                        </div>
                    </div>
                </div>

                <span>
                    <button id="save" type="submit">Salvar</button>
                    <button id="remove" type="submit">Excluir</button>
                </span>

            </form>

        </div>
        </section>
        `;
    container.innerHTML = template;
    return container;
};
