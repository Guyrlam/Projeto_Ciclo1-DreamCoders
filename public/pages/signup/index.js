export default () => {
    console.log('signup template');
    const container = document.createElement('div');
    const template = `
    <section id=signuped>
    <div id="signup">
    <div id="signup-title">
        <h1>Junte-se à comunidade Túnel do Saber </h1>
        <span>Já tenho uma conta</span>
        <a href="#login">
            <button id="siginup-but-login" >Entrar</button>
        </a>
    </div>
<div id="signup-format">
    <div id="forms">
        
            <div style="display:flex; flex-direction:column;">
            <div id="signup-inputs">
                <label for="name">Nome completo</label>
                <input type="text" name="name-login" id="name-signup" class="filling-signup">
                <label for="email">Endereço de E-mail</label>
                <input type="email" name="email-login" id="email-signup" class="filling-signup">
                <label for="telephone">Telefone</label>
                <input type="telephone" name="telefone" id="telephone-signup" class="filling-signup">
                <label for="password">Senha</label>
                <input type="password" name="password-login" id="password-signup" class="filling-signup">
                <label for="repeat-password">Repita a Senha</label>
                <input type="password" name="confirm-password" id="confirm-password" class="filling-signup">
                <label for="pic-profile">Foto de perfil</label>
                <input type="file" name="" accept=".jpg,.png" id="profile-photo-signup">
            </div>
            
            <button id="signup-submit">Cadastrar</button>
            </div>

    </div >
    
</div>
</div>
</section>

    `;
    container.innerHTML = template;
    return container;
};
