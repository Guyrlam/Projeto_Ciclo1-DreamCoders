export default () => {
    console.log('add book');
    const container = document.createElement('div');

    const template = `
    <section id="editbook">
    <div>
        <h2>Alterar cadastro de livro</h2>
    </div>
    <div id="blocks">
        <form action="" method="post" style="display: flex; flex-flow: column nowrap; gap: 30px">

            <label for="book-title">Título do Livro:</label>
            <input type="text" name="book-title" id="book-title">

            <label for="details">Detalhes:</label>
            <input type="text" name="book-details" id="book-details">

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
            <select name="Categoria" id="cateogry">
                <option value="" selected disabled>(selecione)</option>
                <option value="autoajuda">Autoajuda</option>
                <option value="misterio">Mistério</option>
            </select>

            <fieldset title="Estado do livro.">

                <label for="conditions">Condições do livro: </label>
                <input type="radio" name="book-conditions" id="conditions" value="new">
                <span> usado</span>
                <input type="radio" name="book-conditions" id="conditions" value="new">
                <span> seminovo</span>
                <input type="radio" name="book-conditions" id="conditions" value="new">
                <span> antigo</span>
            </fieldset>

            <label for="synopsis">Sinopse:</label>
            <input type="text" name="book-synopsis" id="synopsis">

            <label for="sell">Disponível para venda?</label>

            <div class="button b2" id="button-toggle">
                <input type="checkbox" class="checkbox">
                <div class="knobs">
                    <span></span>
                </div>

            </div>

            <label for="exchange">Disponível para troca?</label>

            <button type="submit">Salvar</button>
            <button type="submit">Excluir livro</button>


        </form>

    </div>
</section>
    `;
    container.innerHTML = template;
    return container;
};
