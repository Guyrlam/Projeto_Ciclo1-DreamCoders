export default async () => {
    console.log('admin template');
    const container = document.createElement('div');
    const reqUsers = await fetch(`/admin/users`).then((res) => {
        return res.json();
    });

    let reqTemplateUsers = '';
    for (const i in reqUsers.data) {
        reqTemplateUsers += `
            <div class="requests">
                <span class="name-type">
                    Solititações de: ${reqUsers.data[i].name}
                </span>
                <p></p>
                <div>
                    <button class="acceptUser-button" id="acceptUser_${reqUsers.data[i].id}">
                        Aceitar
                    </button>
                    <button class="rejectUser-button" id="rejectUser_${reqUsers.data[i].id}">
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
                        Solicitações de usuários
                        <a href="#book-requests">
                            <button id="book-requests" class="button-switch-requests">
                                VER SOLICITAÇÕES DE LIVROS
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

/* 
<dialog id="confirmation-dialog">
    <h1>Do you want to delete everything?</h1>
    <p>You will lose all your data.</p>
    <button id="cancel-delete">Cancel</button>
    <button id="confirm-delete">Delete!</button>
</dialog>
*/
