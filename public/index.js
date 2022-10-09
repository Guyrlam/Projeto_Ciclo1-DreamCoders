import addBook from './pages/books/addBook/index.js';
import postBook from './pages/books/addBook/postBook.js';
import feed from './pages/books/index.js';
import details from './pages/details/index.js';
import home from './pages/home/index.js';
import acesso from './pages/login/acess.js';
import headerLogin from './pages/login/headerLogin.js';
import login from './pages/login/index.js';
import profile from './pages/profile/index.js';
import request from './pages/requests/index.js';
import signup from './pages/signup/index.js';
import postUser from './pages/signup/postUser.js';
import collectUser from './user/user.js';

const main = document.querySelector('#root');
let myUser = {}

/* main.innerHTML ?? null 
    window.addEventListener('load', () => {
        main.appendChild(home())
    } */

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

                })
            }
            break;
        case '#home':
            main.appendChild(home());
            break;
        case '#details':
            main.appendChild(details());
            break;
        case '#login':
            main.appendChild(login());
            const acess = document.querySelector('#button-acessar');
            const hLogin = document.querySelector('#header-login');
            acess.addEventListener('click', async () => {
                const resp = await acesso();
                await console.log(resp)
                if (resp.message == "Usuário logado com sucesso") {

                    //Atribuindo valora a variavel do usuário
                    myUser = await collectUser()
                    myUser = myUser.data[0]
                    console.log(myUser)
                    hLogin.innerHTML = ""
                    hLogin.appendChild(await headerLogin())
                    const helloUser = document.querySelector('#hello-user')
                    const dropdown = document.querySelector('#dropdown-menu')
                    const myprofile = document.querySelector('#myprofile-button')
                    const myrequest = document.querySelector('#requests-button')

                    helloUser.addEventListener('mouseenter', async () => {
                        dropdown.style.display = "flex"
                        dropdown.style.backgroundColor = "var(--green)"
                        myprofile.addEventListener('click', () => {
                            main.innerHTML = ''
                            main.appendChild(profile(myUser))
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
            main.appendChild(request());
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
                    console.log(resp.ERROR)
                }
            });
            break;
        case "#addBook":
            main.appendChild(addBook())
            const save = document.querySelector('#button-save-book');
            save.addEventListener('click', async () => {
                const resp = await postBook();
                if (resp.message == "Livro adicionado com sucesso") {
                    alert("Livro adicionado com sucesso.")
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
        default:
            main.appendChild(home());
            break;
    }
});
