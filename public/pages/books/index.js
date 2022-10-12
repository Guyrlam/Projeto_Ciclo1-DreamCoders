
//import details from '../details/index.js'
export async function temp() {
    const rawResponse = await fetch(`//localhost:8080/book`);
    const content = rawResponse.json();
    return content;
    //console.log(content);
}

function list(data) {
    let ktem = '<section id="books">'
        ;
    for (var i = 0; i < data.length; i++) {
        ktem +=
            `
            <div class="book-feed">
                <a class="a-book-feed">
                    <img src="${data[i].images[0]}" alt="" class="img-book-feed" id="${data[i].id}">
                </a>
                <p>${data[i].name}</p>
            </div>
            `;
    }
    return ktem += '</section>';
}

export default async function feed() {
    const container = document.createElement('div');


    temp().then((data) => {
        container.innerHTML = list(data.data);
    })
    //container.innerHTML = template;

    return container;
};




