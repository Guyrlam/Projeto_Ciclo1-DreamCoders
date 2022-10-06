export default () => {
    console.log('details template');
    const container = document.createElement('div');
    const template = `
    <section id="details">
            <div id="book-photos">
                <div id="small-photos-book">
                    <img src="" alt="" class="small-photo-book">
                    <img src="" alt="" class="small-photo-book">
                    <img src="" alt="" class="small-photo-book">
                </div>
                <div id="main-photo-book">
                    <img src="" alt="" id="main-photo-details">
                </div>
            </div>
            <div id="book-details">

                <div id="title-details-book">
                    <span class="white-text" >Título do livro</span>
                </div>
                <div>
                    <p class="paragrafo-book-details">Colecionador:</p>
                    <p class="paragrafo-book-details">Detalhes:</p>
                    <p class="paragrafo-book-details">Editora: </p>
                    <p class="paragrafo-book-details">Escritor: </p>
                    <p class="paragrafo-book-details">Categoria: </p>
                    <p class="paragrafo-book-details">Condições do livro: </p>
                    <p class="paragrafo-book-details">Sinopse: Lorem ipsum dolor sit amet, consectetur adipisci elit,
                        sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                        consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.</p>
                </div>
                <button id="button-solicitar">Solicitar</button>
            </div>
        </section>
    `;
    container.innerHTML = template;
    return container;
};
