
export default () => {
    console.log('requests template');
    const container = document.createElement('div');

    const template =
        `
    <section id="section-request">
        <div id="div-page-requests">
            <div id="page-requests">
            
                <h1 id="title-requests">Solicitações</h1>
                <div class="requests">
                    <span class="name-type">
                        Jorge Jesus : Troca de Livros!
                    </span>
                    <p>
                        Olá, Mariana! Jorge Jesus deseja trocar o seu livro O Poder do HÁBITO por Sherlock Holmes: Um Estudo em Vermelho
                    </p>
                    <div>
                        <button id="requests-accept">Aceitar</button>
                        <button id="requests-reject">Rejeitar</button>
                    </div>

                </div>
            </div>
        </div>        
    </section>
    `;
    container.innerHTML = template;
    return container;
};