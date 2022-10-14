export default (data) => {
    console.log('edit profile template');
    const container = document.createElement('div');

    const template = `
        <section id="profile">
            <div id="profile-details">
                <div>
                    <img src="${data.image ?? './assets/no-pic-avatar.png'
        }" alt="imagem do perfil" id="profile-photo" name="editimagem">
                    <div id="change-photo">
                        <label for="new-photo" id="label">
                            Adicione aqui uma foto para o perfil
                        </label>
                        <input type="file" accept="image/jpeg,image/png,image/svg+xml" name="new-photo" id="new-photo">
                    </div>
                </div>
                <div id="profile-description">
                    <h3 class="profile-details-text">
                        Nome: 
                        <input type="text" value="${data.name
        }" id="edit-username" class="inputs-edit-myprofile">
                    </h3>
                    <h3>
                        Descrição:
                        <input type="text" value="${data.description ?? ''
        }" id="edit-userdescription" class="inputs-edit-myprofile">
                    </h3>
                    <h3>
                        E-mail:
                        <input type="email" value="${data.email
        }" id="edit-useremail" class="inputs-edit-myprofile">
                    </h3>
                    <h3>
                        Telefone: 
                        <input type="number" value="${data.telephone
        }" id="edit-usertel" class="inputs-edit-myprofile">
                    </h3>
                </div>
                <div id="profile-edit">
                    <button id="save-edit-profile">
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </section>
        `;
    container.innerHTML = template;
    return container;
};
