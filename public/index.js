import addBook from './pages/books/addBook/index.js';
import feed from './pages/books/index.js';
import details from './pages/details/index.js';
import home from './pages/home/index.js';
import login from './pages/login/index.js';
import profile from './pages/profile/index.js';
import signup from './pages/signup/index.js';
import postUser from './pages/signup/postUser.js';
import acesso from './pages/login/acess.js'
import headerLogin from './pages/login/headerLogin.js';
//import postBook from './pages/books/addBook/postBook.js'


const main = document.querySelector('#root');

   window.addEventListener("load", () => {
       main.appendChild(home())
   })

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
            const acess = document.querySelector('#button-acessar')
            const hLogin = document.querySelector('#header-login')
            acess.addEventListener('click', async () => {
                const resp = await acesso();
                console.log(resp.message)
                if(resp.message == "Usuário logado com sucesso"){
                    hLogin.innerHTML = ""
                    hLogin.appendChild(await headerLogin())
                    window.location.hash = '#books'
                }
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
                if (resp.message == "Usuário adicionado com sucesso") {
                    alert("Cadastro realizado com sucesso")
                }
                else{
                    alert(resp.ERROR)
                }
            });
            break;
        case "#addBook":
            main.appendChild(addBook())    
            break;
        case "#acess":
            window.location.hash = '#books'
            break;

    }
});

