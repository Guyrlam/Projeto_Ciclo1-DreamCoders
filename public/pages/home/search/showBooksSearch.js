import search from './index.js';

const pesquisa = document.querySelector('#header-search-bar');
const bookSearch = await search(pesquisa.value);
// import details from '../details/index.js'

function list(data) {
    let ktem = '<section id="books">';
    for (let i = 0; i < data.length; i++) {
        ktem += `
            <div class="book-feed">
                <a class="a-book-feed">
                    <img src="${data[i].images[0]}" alt="" class="img-book-feed" id="${data[i].id}">
                </a>
                <p>${data[i].name}</p>
            </div>
            `;
    }
    return (ktem += '</section>');
}

export default async function feed() {
    const container = document.createElement('div');

    search(pesquisa.value).then((data) => {
        container.innerHTML = list(data);
    });
    // container.innerHTML = template;

    return container;
}
