const userCardTemplate = document.querySelector('[data-user-template]');
const userCardContainer = document.querySelector('[data-user-cards-container]');
const searchInput = document.querySelector('[data-search]');

const bookResults = [];

searchInput.addEventListener('input', (e) => {
    const word = e.target.value.toLowerCase();
    bookResults.forEach((book) => {
        const isVisible =
            book.name.toLowerCase().includes(word) ||
            book.email.toLowerCase().includes(word);
        book.element.classList.toggle('hide', !isVisible);
    });
});

fetch(`:8080/`)
    .then((res) => res.json())
    .then((data) => {
        books = data.map((book) => {
            const card = userCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector('[data-header]');
            const body = card.querySelector('[data-body]');
            header.textContent = book.name;
            body.textContent = book.email;
            userCardContainer.append(card);
            return { name: book.name, email: book.email, element: card };
        });
    });

export default search;
