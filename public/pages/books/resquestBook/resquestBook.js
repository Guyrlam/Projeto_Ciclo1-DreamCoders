import { myUser } from "../../../index.js";
export default (data) => {
    console.log('details template');
    console.log(data)
    const container = document.createElement('div');

    const mybooks = myUser.books
    let optionsMyBook = ''
    for (let i in mybooks) {
        optionsMyBook += `<option value="${mybooks[i].name}">${mybooks[i].name}</option>`
    }

    const template =
        `
        <section id="resquest-book">
            <h1>
                Solicitar Livro
            </h1>
            
            <div id="trocadelivro">
                <div>
                    Solicitar Troca de: 
                </div>
                <div>
                    <img src="${data.images[0]}" alt="" width="99px" height="140px">
                    <p>
                        ${data.name}
                    </p>
                </div>
                <div>
                    Por: 
                </div>
                <div class="xwv">
                    <img src="" alt="" id="img-troca" width="99px" height="140px">
                    
                    <select name="Meus Livros" id="mybooks-troca">
                        <option value="Meus Livros" selected disabled>
                            Escolher Livro
                        </option>

                        ${optionsMyBook}

                    </select>
                </div>
            </div>
            <button id="button-trocar">
                Trocar
            </button>
        </section>
        `;

    container.innerHTML = template;
    return container;
};
