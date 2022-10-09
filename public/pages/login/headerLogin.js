export default async function headerLogin() {
    const container = document.createElement('div');
    const template = `
    <span id="hello-user">
        <img src="./assets/icon-user.png" alt="" id="icon-user" width="27px" height="27px">
        Olá, Usuário!          
    </span>
    
    <div id="dropdown-menu">
        <button class="button-dropdown-menu" id="myprofile-button">Meu Perfil</button>
        <button class="button-dropdown-menu" id="requests-button">Solicitações</button>
    </div>
    `
    container.innerHTML = template
    return container
}
