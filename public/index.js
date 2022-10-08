import addBook from './pages/books/addBook/index.js';
import feed from './pages/books/index.js';
import details from './pages/details/index.js';
import home from './pages/home/index.js';
import login from './pages/login/index.js';
import profile from './pages/profile/index.js';
import signup from './pages/signup/index.js';
import postUser from './pages/signup/postUser.js';
import acesso from './pages/login/acess.js';
import headerLogin from './pages/login/headerLogin.js';
<<<<<<< HEAD
// import postBook from './pages/books/addBook/postBook.js'
=======
import postBook from './pages/books/addBook/postBook.js'
>>>>>>> main

const main = document.querySelector('#root');

window.addEventListener('load', () => {
    main.appendChild(home());
});

window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
        case '#books':
            main.appendChild(feed());
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
                if(resp.message == "Usuário logado com sucesso"){
                    hLogin.innerHTML = ""
                    hLogin.appendChild(await headerLogin())
                    const helloUser = document.querySelector('#hello-user')
                    const dropdown = document.querySelector('#dropdown-menu')
                    const myprofile = document.querySelector('#myprofile-button')
                     
                    helloUser.addEventListener('mouseenter', async () => {
                        dropdown.style.display = "flex"
                        myprofile.addEventListener('click', () => {
                            window.location.hash = "#profile"
                        })
                        
                    })
                    dropdown.addEventListener('mouseleave', async () => {
                        dropdown.style.display = 'none'
                    })
                }
                window.location.hash = "#books"
            })
            break;
        case '#profile':
            main.appendChild(profile());
            break;
        case '#signup':
            main.appendChild(signup());
            const submit = document.querySelector('#signup-submit');
            submit.addEventListener('click', async () => {
                const resp = await postUser();
<<<<<<< HEAD
                if (resp.message == 'Usuário adicionado com sucesso') {
                    alert('Cadastro realizado com sucesso');
                } else {
                    alert(resp.ERROR);
                }
            });
            break;
        case '#addBook':
            main.appendChild(addBook());
=======
                if (resp.message == "Usuário adicionado com sucesso") {
                    alert("Cadastro realizado com sucesso")
                    window.location.hash = "#login"
                }
                else{
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
                    alert("Livro adicionado com sucesso")
                    window.location.hash = "#profile"
                }
                else{
                    alert(resp.ERROR)
                }
                
            });    
>>>>>>> main
            break;
        case '#acess':
            window.location.hash = '#books';
            break;
    }
});
