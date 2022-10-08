export default (data) => {
    console.log('profile template');
    const container = document.createElement('div');
    function addmybooks(dataF){
        let template = ''
        for(let i in dataF.books){
            template += `<img src="${dataF.books[i].image[0]}" alt="" class="books-profile">`
        }
        return template
    }
    const mybooks = addmybooks(data)
    const template = `
    <section id="profile">
            <div id="profile-details">
                <div>
                    <img src="https://i.pinimg.com/originals/1d/4d/69/1d4d69c694c8ba1034c0e9552f457ecf.jpg" alt=""
                        id="profile-photo">
                </div>
                <div id="profile-description">
                    <h1 class="profile-details-text">Nome: ${data.name}</h1>
                    <p class="profile-details-text">${data.description}
                    </p>
                </div>
                <div id="profile-edit">
                    <button id="profile-button-edit">Editar Perfil</button>
                </div>
            </div>
            <div id="profile-my-collections">
                <h1 id="my-collection-text">Minha Coleção</h1>
                <div id="profile-colletion-books">
                    ${mybooks}
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
