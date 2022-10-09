export default (data) => {
    console.log('add book');
    const container = document.createElement('div');

    const template = `
    <section id="profile">
    <div id="profile-details">
        <div>
            <img src="${data.image}" alt=""
                id="profile-photo" name="editimagem">
            <div id="change-photo">
                <label for="new-photo" id="label">Envie a photo de perfil</label>
                <input type="file" name="new-photo" id="new-photo">
            </div>
        </div>
        <div id="profile-description">
            <h1 class="profile-details-text">Nome: <input type="text" value="${data.name}" id="edit-username" class="inputs-edit-myprofile"></h1>
            <p class="profile-details-text">
            <input type="text" value="${data.description}" id="edit-userdescription" class="inputs-edit-myprofile">
            </p>
        </div>
        <div id="profile-edit">
            <button id="save-edit-profile">Salvar Alterações</button>
        </div>
    </div>
</section>
    `;
    container.innerHTML = template;
    return container;
};
