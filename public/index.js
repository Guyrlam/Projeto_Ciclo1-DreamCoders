import addBook from './pages/books/addBook/index.js';
import postBook from './pages/books/addBook/postBook.js';
import feed from './pages/books/index.js';
import resquestBook from './pages/books/resquestBook/resquestBook.js';
import details from './pages/details/index.js';
import home from './pages/home/index.js';
import acesso from './pages/login/acess.js';
import headerLogin from './pages/login/headerLogin.js';
import login from './pages/login/index.js';
import saveedit from './pages/profile/editProfile/editProfile.js';
import editprofile from './pages/profile/editProfile/index.js';
import profile from './pages/profile/index.js';
import requestClient from './pages/requests/cliente/index.js';
import requestAdm from './pages/requests/adm/index.js';
import signup from './pages/signup/index.js';
import postUser from './pages/signup/postUser.js';
import collectUser from './user/user.js';


const main = document.querySelector('#root');
let myUser = {}
let idUser = ''
let myBooks = []

async function refreshData() {
    myUser = await collectUser(idUser)
    myUser = myUser.data
    mybooks = myUser.books
    return myUser
}
async function refreshHeader() {
    hLogin.innerHTML = ""
    hLogin.appendChild(await headerLogin())
}

document.querySelector('#toFeed').addEventListener('click', async () => {
    main.innerHTML = ''
    main.appendChild(await feed());
    async function temp() {
        const rawResponse = await fetch(`//localhost:8080/book`);
        const content = rawResponse.json();
        return content;
    }
    const bookData = await temp()
    const books = document.querySelectorAll('.img-book-feed')
    for (let i in books) {
        books[i].addEventListener('click', async () => {

            main.innerHTML = ''
            main.appendChild(details(bookData.data[i]));
            const solicitar = document.querySelector('#button-solicitar')
            solicitar.addEventListener('click', () => {
                if (idUser == '') {
                    alert('Cadastre-se primeiro')
                }
                else {
                    main.innerHTML = ''
                    main.appendChild(resquestBook(bookData.data[i]))
                    const trocar = document.querySelector('#button-trocar')
                    trocar.addEventListener('click', () => {
                        console.log('troca')


                    })

                    const mybooks = myUser.books
                    var select = document.getElementById('mybooks-troca');
                    console.log(select)


                    console.log(mybooks[0])
                    select.addEventListener('change', () => {
                        var bookSelected = select.value;
                        for (let i in mybooks) {
                            if (mybooks[i].name == bookSelected) {
                                document.querySelector('#img-troca').src = mybooks[i].image[0]
                            }
                        }
                    })
                }

            })


        })
    }
})
if (main.childElementCount === 0) { main.appendChild(home()) };

window.addEventListener('hashchange', async () => {
    main.innerHTML = ''

    switch (window.location.hash) {
        case '#books':
            main.appendChild(await feed());
            async function temp() {
                const rawResponse = await fetch(`//localhost:8080/book`);
                const content = rawResponse.json();
                return content;
            }
            const bookData = await temp()
            const books = document.querySelectorAll('.img-book-feed')


            for (let i in books) {
                books[i].addEventListener('click', async () => {

                    main.innerHTML = ''
                    main.appendChild(details(bookData.data[i]));
                    const solicitar = document.querySelector('#button-solicitar')
                    solicitar.addEventListener('click', () => {
                        if (idUser == '') {
                            alert('Cadastre-se primeiro')
                        }
                        else {
                            main.innerHTML = ''
                            main.appendChild(resquestBook(bookData.data[i]))
                            const trocar = document.querySelector('#button-trocar')
                            trocar.addEventListener('click', () => {
                                console.log('troca')


                            })

                            const mybooks = myUser.books
                            var select = document.getElementById('mybooks-troca');
                            console.log(select)


                            console.log(mybooks[0])
                            select.addEventListener('change', () => {
                                var bookSelected = select.value;
                                for (let i in mybooks) {
                                    if (mybooks[i].name == bookSelected) {
                                        document.querySelector('#img-troca').src = mybooks[i].image[0]
                                    }
                                }
                            })
                        }

                    })


                })
            }

            break;
        case '#home':
            main.appendChild(home());
            break;
        case '#login':
            main.appendChild(login());
            const acess = document.querySelector('#button-acessar');
            const hLogin = document.querySelector('#header-login');
            acess.addEventListener('click', async () => {
                const resp = await acesso();
                await console.log(resp.logged)
                idUser = resp.logged

                if (resp.message == "Usuário logado com sucesso") {

                    //Atribuindo valora a variavel do usuário
                    myUser = await collectUser(idUser)
                    myUser = myUser.data
                    console.log(myUser)

                    hLogin.innerHTML = ""
                    hLogin.appendChild(await headerLogin())
                    const helloUser = document.querySelector('#hello-user')
                    const dropdown = document.querySelector('#dropdown-menu')
                    const myprofile = document.querySelector('#myprofile-button')
                    const myrequest = document.querySelector('#requests-button')

                    helloUser.addEventListener('mouseenter', async () => {
                        dropdown.style.display = "flex"
                        myprofile.addEventListener('click', async function renderProfile() {
                            myUser = await collectUser(idUser)
                            myUser = myUser.data
                            main.innerHTML = ''
                            main.appendChild(await profile(myUser))
                            const editProfile = document.querySelector('#profile-button-edit')
                            editProfile.addEventListener('click', () => {
                                main.innerHTML = ''
                                main.appendChild(editprofile(myUser))
                                const saveEdit = document.querySelector('#save-edit-profile')
                                saveEdit.addEventListener('click', async () => {
                                    const resp = await saveedit(myUser)
                                    if (resp.status == 200) {
                                        alert('Perfil editado com sucesso!')
                                        renderProfile()

                                    }
                                })
                            })


                        })
                        myrequest.addEventListener('click', () => {
                            window.location.hash = "#request"
                        })
                    })
                    dropdown.addEventListener('mouseleave', async () => {
                        dropdown.style.display = 'none'
                    })
                    window.location.hash = "#books"
                }
                else {
                    alert(resp.ERROR)
                }

            })
            break;
        case '#request':
            if(myUser.class=='cliente'){
                main.appendChild(requestClient());
            }
            if(myUser.class=='administrador'){
                main.appendChild(requestAdm())
            }
            
            break;
        case '#signup':
            main.appendChild(signup());
            const submit = document.querySelector('#signup-submit');
            submit.addEventListener('click', async () => {
                const resp = await postUser();
                if (resp.message == "Usuário adicionado com sucesso") {
                    alert("Cadastro realizado com sucesso")
                    window.location.hash = "#login"
                }
                else {
                    alert(resp.ERROR)
                }
            });
            break;
        case "#addBook":
            main.appendChild(addBook())
            const save = document.querySelector('#save-new-book-button');
            save.addEventListener('click', async () => {
                const resp = await postBook();
                if (resp.message == "Livro adicionado com sucesso") {
                    alert("Livro adicionado com sucesso.")
                    refreshData()
                    window.location.hash = "#profile"
                }
                else {
                    alert(resp.ERROR)
                }

            });
            break;
        case '#acess':
            window.location.hash = '#books';
            break;
        case '#profile':
            renderProfile()
            break;
    }
});

export { myUser };

/*window.addEventListener('load', () => {
    main.appendChild(home())
} */