import { myUser } from "../../index.js";
import isMyBook from "../books/isMyBook.js";
export default (data) => {
    console.log('details template');
    let editOrRequest = ''
    const botao = isMyBook(myUser, data)
    if (botao == true) {
        editOrRequest =
            `
            <button id="button-editBook" class="edit-book">
                <a>
                    Editar Livro
                </a>
            </button>
            `
    }
    else {
        editOrRequest =
            `
            <button id="button-solicitar">
                Solicitar
            </button>
            `
    }
    const container = document.createElement('div');
    const template =
        `
        <section id="details">
            <div id="book-photos">
                <div id="small-photos-book">
                    
                </div>
                <div id="main-photo-book">
                    <img src="${data.images[0]}" alt="" id="main-photo-details">
                </div>
            </div>
            <div id="book-details">
                <div id="title-details-book">
                    <span class="white-text">
                        ${data.name}
                    </span>
                </div>
                <div>
                    <p class="paragrafo-book-details">
                        Colecionador: ${data.collector}
                    </p>
                    <p class="paragrafo-book-details">
                        Detalhes: ${data.details}
                    </p>
                    <p class="paragrafo-book-details">
                        Editora: ${data.publisher}
                    </p>
                    <p class="paragrafo-book-details">
                        Escritor: ${data.writer}
                    </p>
                    <p class="paragrafo-book-details">
                        Categoria: ${data.category}
                    </p>
                    <p class="paragrafo-book-details">
                        Condições do livro: ${data.condition}
                    </p>
                    <p class="paragrafo-book-details">
                        Sinopse: ${data.synopsis}
                    </p>
                </div>

                ${editOrRequest}
            </div>
        </section>
        `;
    container.innerHTML = template;
    return container;
};
