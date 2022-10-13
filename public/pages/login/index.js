export default () => {
    console.log('login template');
    const container = document.createElement('div');

    const template = `
        <section>
            <div id="login">
                <div id="login-title">
                    <h1>
                        Faça login em Túnel do Saber
                    </h1>

                    <span>
                        Sua primeira vez aqui? Crie uma conta!
                    </span>
                    <a href="#signup">
                        <button id="login-cadastre-se">
                            Cadastre-se
                        </button>
                    </a>
                </div>
                <form>            
                    <div id="login-inputs">
                        <label for="email-login">
                            Endereço de E-mail
                        </label>
                        <input type="email" name="email-login" id="email-login" class="filling-login" required>
                        <label for="password-login">
                            Senha
                        </label>
                        <input type="password" name="password-login" id="password-login" class="filling-login" required>
                        <div id="acessar">
                            <a id="a-acessar">
                                <button id="button-acessar" type="button">
                                    Acessar
                                </button>
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        `;
    container.innerHTML = template;
    return container;
};
