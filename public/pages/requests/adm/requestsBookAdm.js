export default async () => {
    console.log('requestsBookAdm template');
    const container = document.createElement('div');
    const reqBooks = await fetch(`/admin/books`).then((res) => {
        return res.json();
    });

    let reqTemplateUsers = '';
    for (const i in reqBooks.data) {
        reqTemplateUsers += `
            <div class="requests">
                <span class="name-type">
                    Solititações de: ${reqBooks.data[i].collector}
                </span>
                <div id="info-requestBooks">
                <p>
                    Livro: ${reqBooks.data[i].name}
                </p>
                <img src="${reqBooks.data[i].images[0]}" width="101px" height="142px">
                </div>
                <div>
                    <button class="acceptBook-button" id="acceptBook_${reqBooks.data[i].id}">
                        Aceitar
                    </button>
                    <button class="rejectBook-button" id="rejectBook_${reqBooks.data[i].id}">
                        Rejeitar
                    </button>
                </div>
            </div>
            `;
    }

    const template = `
        <section id="section-request">
            <div id="div-page-requests">
                <div id="page-requests">
                    
                    <h1 id="title-requests">
                        Solicitações de livros
                        <a href="#request">
                            <button id="book-requests" class="button-switch-requests">
                                VER SOLICITAÇÕES DE USUÁRIOS
                            </button>
                        </a>
                    </h1>
                    ${reqTemplateUsers}

                </div>
            </div>
        </section>
        `;
    container.innerHTML = template;
    return container;
};
