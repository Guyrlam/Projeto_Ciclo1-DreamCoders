export default async () => {
    console.log('requests template');
    const container = document.createElement('div');
    const reqBooks = await fetch('http://localhost:8080/admin/books')
    .then(
        (res) => {
            return res.json()
        }
    )
    
    let reqTemplateUsers = ''
    for(let i in reqBooks.data){
        reqTemplateUsers+=
        `
<div class="requests">
        <span class="name-type">Solititações de: ${reqBooks.data[i].name}</span>
        <p></p>
        <div>
            <button class="acceptBook-button" id="acceptBook:${reqBooks.data[i].id}">Aceitar</button>
            <button class="rejectBook-button" id="rejectBook:${reqBooks.data[i].id}">Rejeitar</button>
        </div>
</div>
        `
    }


    
    const template = `
    <section id="section-request">
    <div id="div-page-requests">
    <div id="page-requests">
        
        <h1 id="title-requests">Solicitações de livros<a href="#request">
        <button id="book-requests" class="button-switch-requests">VER SOLICITAÇÕES DE USUÁRIOS</button>
        </a></h1>
        ${reqTemplateUsers}
    </div>
    </div>


        
</section>

    `;
    container.innerHTML = template;
    return container;
};