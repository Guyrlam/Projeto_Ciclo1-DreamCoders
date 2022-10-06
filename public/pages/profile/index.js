export default () => {
    console.log('profile template');
    const container = document.createElement('div');

    const template = `
    <section id="profile">
            <div id="profile-details">
                <div>
                    <img src="https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg" alt=""
                        id="profile-photo">
                </div>
                <div id="profile-description">
                    <h1 class="profile-details-text">Nome:</h1>
                    <h3 class="profile-details-text">Coleção</h3>
                    <h3 class="profile-details-text">Classificação</h3>
                    <p class="profile-details-text">Lorem ipsum dolor sit amet, consectetur adipisci elit,
                        sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    </p>
                </div>
                <div id="profile-edit">
                    <button id="profile-button-edit">Editar Perfil</button>
                </div>
            </div>
            <div id="profile-my-collections">
                <h1 id="my-collection-text">Minha Coleção</h1>
                <div id="profile-colletion-books">
                    <img src="" alt="" class="books-profile">
                    <img src="" alt="" class="books-profile">
                    <img src="" alt="" class="books-profile">
                    <img src="" alt="" class="books-profile">
                </div>
                <div id="profile-button-add">
                    <a href="#addBook">
                        <button id="button-add">Adicionar</button>
                    </a>
                    
                </div>
            </div>
        </section>
    `;
    container.innerHTML = template;
    return container;
};
