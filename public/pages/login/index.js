export default () => {

    console.log('login template')
    const container = document.createElement('div')

    const template = `
    <section>
    <div id="login">
    <div id="login-title">
        <h1>Faça login em Túnel do Saber</h1>

        <span>Sua primeira vez aqui? Crie uma conta!</span>
        <a href="#signup">
            <button>Cadastre-se</button>
        </a>
    </div>
    <div>
        <form method="POST">
            <div id="login-checkbox">
                <label for="checkbox-user">Sou Usuário
                    <input type="checkbox" name="checkbox-user" id="checkbox-user" class="checkbox" type="">
                    <span class="mark"></span>
                </label>

                <label for="checkbox-adm">Sou Administrador
                    <input type="checkbox" name="checkbox-adm" id="checkbox-adm" class="checkbox">
                    <span class="mark"></span>
                </label>

            </div>
            <div id="login-inputs">
                <label for="email-login">Endereço de Email</label>
                <input type="email" name="email-login" id="email-login" class="filling-login">
                <label for="email-login">Senha</label>
                <input type="email" name="email-login" id="email-login" class="filling-login">
            </div>
        </form>
    </div>
</div>
    </section>
    `;
    container.innerHTML = template;
    return container;
};
