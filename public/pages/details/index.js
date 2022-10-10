export default (data) => {
    console.log('details template');
    console.log(data)
    const container = document.createElement('div');
    const template = `
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
                    <span class="white-text" >${data.name}</span>
                </div>
                <div>
                    <p class="paragrafo-book-details">Colecionador: ${data.collector}</p>
                    <p class="paragrafo-book-details">Detalhes: ${data.details}</p>
                    <p class="paragrafo-book-details">Editora: ${data.publisher}</p>
                    <p class="paragrafo-book-details">Escritor: ${data.writer}</p>
                    <p class="paragrafo-book-details">Categoria: ${data.category}</p>
                    <p class="paragrafo-book-details">Condições do livro: ${data.condition}</p>
                    <p class="paragrafo-book-details">Sinopse: ${data.synopsis}</p>
                </div>
                <button id="button-solicitar">Solicitar</button>
            </div>
        </section>
    `;
    container.innerHTML = template;
    return container;
};
