export default () => {
    console.log('home template');
    const container = document.createElement('div');

    const template = `
        <section>
            <div id="main-text">
                <h1 id="title-main-text">
                    Contribua para que a cultura do livro físico viva. Compartilhe sua coleção com o mundo!
                </h1>
                <p id="p-main-text">
                    Sabe aquele livro parado em sua estante há meses ou até anos? Já pensou em trocá-lo com outras pessoas e permitir que ambos os envolvidos desfrutem das incríveis experiências que esses itens podem proporcionar?
                    Se ficou interessado, crie já seu perfil e venha participar da nossa comunidade!
                </p>
                <button id="button-main" class="button-border-radius">
                    <a href="#signup">
                        Cadastre-se
                    </a>
                </button>
            </div>
            <img src="./assets/main-image.svg" alt="contribua para a cultura da troca de livros" id="main-img">
        </section>
        `;
    container.innerHTML = template;
    return container;
};
