export default async function headerLogin() {
    const container = document.createElement('div');
    const template = `
    <span id="hello-user">
                        <img src="./assets/icon-user.png" alt="" id="icon-user" width="27px" height="27px">
                        Olá Usuário
                        
    </span>
    `;
    container.innerHTML = template;
    return container;
}
