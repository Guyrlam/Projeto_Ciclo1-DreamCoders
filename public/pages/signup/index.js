export default () => {
    console.log('signup template')
    const container = document.createElement('div')
    const template = `
    <section id=signuped>
    <div id="signup">
    <div id="signup-title">
        <h1>Junte-se à comunidade Túnel do Saber </h1>

        <span>Já tenho uma conta</span>
        <a href="#login">
            <button id="but-login" >Entrar</button>
        </a>
    </div>
<div id="format">
    <div id="forms">
        <form action="/user" method="POST">
            
            <div id="signup-inputs">
                <label for="name-login">Nome  completo</label>
                <input type="text" name="name-login" id="email-login" class="filling-login">
                <label for="email-login">Endereço de Email</label>
                <input type="email" name="email-login" id="email-login" class="filling-login">
                <label for="email-login">Senha</label>
                <input type="password" name="password-login" id="email-login" class="filling-login">
                <label for="email-login">Repita a Senha</label>
                <input type="password" name="confirm-password" id="email-login" class="filling-login">
                
            </div>
            
            <input id="submit" type="submit" value="cadastrar">


        </form>


    </div >
    <div id="auto-cadastro">
    <span>Cadastre-se com:</span>

    <img class="auto" src="assets/Google Logo.svg (1).png" alt="logo google">

    <img class="auto" src="assets/logo face.png" alt="logo facebook">


    



    </div>
</div>
</div>
    </section>


    `
    container.innerHTML = template
    return container
}