export default async () => {
    console.log('requests template');
    const container = document.createElement('div');

    const reqSwap = await fetch(`/swap`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            return res.data;
        });
    await console.log(reqSwap);

    let reqTemplate = '';

    for (const i in reqSwap) {
        if (reqSwap[i].status == 'aguardando sua resposta') {
            reqTemplate += `
        <div class="requests">
        <span class="name-type">
            ${reqSwap[i].book_id.collector} : Troca de Livros!
        </span>
        <p>
            Olá, ${reqSwap[i].change_for.collector}! ${reqSwap[i].book_id.collector} deseja trocar o seu livro "${reqSwap[i].change_for.name}" por "${reqSwap[i].book_id.name}"
        </p>
        <p>Horário: ${reqSwap[i].requested_at}</P>
        <p>Status: ${reqSwap[i].status}</P>
        <div>
            <button id="requests-accept_${reqSwap[i].id}" class="requestsCliente-accept">Aceitar</button>
            <button id="requests-reject_${reqSwap[i].id}" class="requestsCliente-reject">Rejeitar</button>
        </div>

    </div>
    `;
        }
    }

    const template = `
    <section id="section-request">
        <div id="div-page-requests">
            <div id="page-requests">
            
                <h1 id="title-requests">Solicitações</h1>
                ${reqTemplate}
            </div>
        </div>        
    </section>
    `;
    container.innerHTML = template;
    return container;
};
