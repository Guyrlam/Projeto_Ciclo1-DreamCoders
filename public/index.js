// -- Page modules for SPA loadings --
import addBook from './pages/books/addBook/index.js';
import postBook from './pages/books/addBook/postBook.js';
import editBook from './pages/books/editBook/index.js';
import feed from './pages/books/index.js';
import resquestBook from './pages/books/resquestBook/resquestBook.js';
import swap from './pages/books/swap/swap.js';
import details from './pages/details/index.js';
import home from './pages/home/index.js';
import search from './pages/home/search/index.js';
import showBooksSearch from './pages/home/search/showBooksSearch.js';
import acesso from './pages/login/acess.js';
import headerLogin from './pages/login/headerLogin.js';
import login from './pages/login/index.js';
import saveedit from './pages/profile/editProfile/editProfile.js';
import editprofile from './pages/profile/editProfile/index.js';
import profile from './pages/profile/index.js';
import requestAdm from './pages/requests/adm/index.js';
import requestsBookAdm from './pages/requests/adm/requestsBookAdm.js';
import acceptbook from './pages/requests/approving/acceptBook.js';
import acceptuser from './pages/requests/approving/acceptUser.js';
import rejectbook from './pages/requests/approving/rejectbook.js';
import rejectuser from './pages/requests/approving/rejectUser.js';
import approvedswap from './pages/requests/cliente/approvedSwap.js';
import requestClient from './pages/requests/cliente/index.js';
import rejectswap from './pages/requests/cliente/rejectSwap.js';
import concludeSwap from './pages/requests/concludeSwap.js';
import signup from './pages/signup/index.js';
import postUser from './pages/signup/postUser.js';
import collectUser from './user/user.js';
import refresh from './pages/home/refresh.js';
import logout from './pages/login/logout.js';

const main = document.querySelector('#root');
let myUser = {};
let idUser = '';
let mybooks = [];
let book = {};
let em = ''
let pass = ''

function newAlert(msg){
    const txtalert = document.querySelector('#text-alert')
    const alert = document.querySelector('#alert')
    const ok = document.querySelector('#button-alert')
    txtalert.innerHTML = msg
    alert.style.display = 'flex'
    ok.addEventListener('click', () => {
        alert.style.display = 'none'
    })
    return true
}

async function refreshData() {
    myUser = await collectUser(idUser);
    myUser = myUser.data;
    mybooks = myUser.books;
    return myUser;
}
async function refreshHeader() {
    hLogin.innerHTML = '';
    hLogin.appendChild(await headerLogin());
}

document
    .querySelector('#header-search-button')
    .addEventListener('click', async () => {
        const pesquisa = document.querySelector('#header-search-bar');
        main.innerHTML = '';
        main.appendChild(await showBooksSearch(pesquisa.value));
        const bookData = await search(pesquisa.value);
        const books = document.querySelectorAll('.img-book-feed');
        for (const i in books) {
            books[i].addEventListener('click', async () => {
                book = bookData[i];
                main.innerHTML = '';
                main.appendChild(details(bookData[i]));
                const solicitar = document.querySelector('#button-solicitar');
                solicitar.addEventListener('click', () => {
                    if (idUser == '') {
                        newAlert('Cadastre-se primeiro');
                    } else {
                        main.innerHTML = '';
                        main.appendChild(resquestBook(bookData.data[i]));

                        const mybooks = myUser.books;
                        const select = document.getElementById('mybooks-troca');

                        let bookToExchange = {};
                        select.addEventListener('change', async () => {
                            const bookSelected = select.value;
                            for (const i in mybooks) {
                                if (mybooks[i].name == bookSelected) {
                                    document.querySelector('#img-troca').src =
                                        mybooks[i].image[0];
                                    bookToExchange = mybooks[i];
                                }
                            }
                        });
                        const trocar = document.querySelector('#button-trocar');
                        trocar.addEventListener('click', async () => {
                            const resp = await swap(
                                bookData.data[i],
                                bookToExchange
                            );
                            await console.log(resp);
                            
                            newAlert("Troca solicitada com sucesso!");
                            window.location.hash = '#profile';
                            
                            
                        });
                    }
                });
            });
        }
    });



document.querySelector('#toFeed').addEventListener('click', async () => {
    main.innerHTML = '';
    main.appendChild(await feed());
    async function temp() {
        const rawResponse = await fetch(`/book`);
        const content = rawResponse.json();
        return content;
    }
    const bookData = await temp();
    const books = document.querySelectorAll('.img-book-feed');
    for (const i in books) {
        books[i].addEventListener('click', async () => {
            book = books[i];
            main.innerHTML = '';
            main.appendChild(details(bookData.data[i]));
            const solicitar = document.querySelector('#button-solicitar');
            solicitar.addEventListener('click', () => {
                if (idUser == '') {
                    newAlert('Cadastre-se primeiro.');
                } else {
                    main.innerHTML = '';
                    main.appendChild(resquestBook(bookData.data[i]));

                    const mybooks = myUser.books;
                    const select = document.getElementById('mybooks-troca');

                    let bookToExchange = {};
                    select.addEventListener('change', async () => {
                        const bookSelected = select.value;
                        for (const i in mybooks) {
                            if (mybooks[i].name == bookSelected) {
                                document.querySelector('#img-troca').src =
                                    mybooks[i].image[0];
                                bookToExchange = mybooks[i];
                            }
                        }
                    });
                    const trocar = document.querySelector('#button-trocar');
                    trocar.addEventListener('click', async () => {
                        const resp = swap(bookData.data[i], bookToExchange);
                        await console.log(resp);
                        newAlert("Troca Solicitada com sucesso!");
                        
                    });
                }
            });
        });
    }
});
if (main.childElementCount === 0) {
    main.appendChild(home());
}

window.addEventListener('hashchange', async () => {
    main.innerHTML = '';
    Object.assign(main.style, { opacity: 1, transition: '800ms' });
    switch (window.location.hash) {
        case '#books':
            refreshData();
            main.appendChild(await feed());
            async function temp() {
                const rawResponse = await fetch(`/book`);
                const content = rawResponse.json();
                return content;
            }
            const bookData = await temp();
            const books = document.querySelectorAll('.img-book-feed');

            for (const i in books) {
                books[i].addEventListener('click', async () => {
                    book = bookData.data[i];
                    main.innerHTML = '';
                    main.appendChild(details(bookData.data[i]));
                    const solicitar = document.querySelector('#button-solicitar');
                    solicitar.addEventListener('click', () => {
                        if (idUser == '') {
                            newAlert('Cadastre-se primeiro');
                        } else {
                            main.innerHTML = '';
                            main.appendChild(resquestBook(bookData.data[i]));

                            const mybooks = myUser.books;
                            const select = document.getElementById('mybooks-troca');

                            let bookToExchange = {};
                            select.addEventListener('change', async () => {
                                const bookSelected = select.value;
                                for (const i in mybooks) {
                                    if (mybooks[i].name == bookSelected) {
                                        document.querySelector('#img-troca').src =
                                            mybooks[i].image[0];
                                        bookToExchange = mybooks[i];
                                    }
                                }
                            });
                            const trocar = document.querySelector('#button-trocar');
                            trocar.addEventListener('click', async () => {
                                const resp = await swap(
                                    bookData.data[i],
                                    bookToExchange
                                );
                                await console.log(resp);
                                newAlert("Troca solicitada com sucesso!");

                            });
                        }
                    });
                });
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
                await console.log(resp.logged);
                idUser = resp.logged;

                if (resp.message == 'Usuário logado com sucesso') {
                    // Atribuindo valora a variavel do usuário
                    myUser = await collectUser(idUser);
                    myUser = myUser.data;
                    console.log(myUser);
                    const email = document.querySelector('#email-login');
                    const password = document.querySelector('#password-login');


                    hLogin.innerHTML = '';
                    hLogin.appendChild(await headerLogin());
                    document.querySelector('#logout-button').addEventListener('click', async () => {
                        document.cookie += '_deslogado'
                        const resp = await logout()
                        console.log(resp)
                        window.location.reload()
                    })
                    const helloUser = document.querySelector('#hello-user');
                    const dropdown = document.querySelector('#dropdown-menu');
                    const myprofile = document.querySelector('#myprofile-button');
                    const myrequest = document.querySelector('#requests-button');

                    helloUser.addEventListener('mouseenter', async () => {
                        dropdown.style.display = 'flex';
                        myprofile.addEventListener(
                            'click',
                            async function renderProfile() {
                                myUser = await collectUser(idUser);
                                myUser = myUser.data;
                                main.innerHTML = '';
                                main.appendChild(await profile(myUser));
                                const editProfile = document.querySelector(
                                    '#profile-button-edit'
                                );
                                editProfile.addEventListener('click', () => {
                                    main.innerHTML = '';
                                    main.appendChild(editprofile(myUser));
                                    const saveEdit =
                                        document.querySelector('#save-edit-profile');
                                    saveEdit.addEventListener('click', async () => {
                                        const resp = await saveedit(myUser);
                                        if (resp.status == 200) {
                                            newAlert('Perfil editado com sucesso!');
                                            renderProfile();
                                        }
                                    });
                                });
                            }
                        );
                        myrequest.addEventListener('click', () => {
                            window.location.hash = '#request';
                        });
                    });
                    dropdown.addEventListener('mouseleave', async () => {
                        dropdown.style.display = 'none';
                    });
                    window.location.hash = '#books';
                } else {
                    newAlert(resp.ERROR);
                }
            });
            break;
        case '#request':
            if (myUser.class == 'cliente') {
                main.appendChild(await requestClient());
                const acceptSwap = document.querySelectorAll(
                    '.requestsCliente-accept'
                );
                const rejectSwap = document.querySelectorAll(
                    '.requestsCliente-reject'
                );
                for (const k in acceptSwap) {
                    acceptSwap[k].addEventListener('click', async () => {
                        const idSwap = acceptSwap[k].id.split('_')[1];
                        const resp = await approvedswap(idSwap);
                        await newAlert(resp.message);
                        const resp1 = concludeSwap(idSwap);
                        await console.log(resp1);
                        await refreshData();
                        window.location.hash = "#books"
                    });
                    rejectSwap[k].addEventListener('click', async () => {
                        const idSwap = rejectSwap[k].id.split('_')[1];
                        const resp = await rejectswap(idSwap);
                        await newAlert("Troca Rejeitada");
                        await refreshData();
                        window.location.hash = "#books"
                    });
                }
            }
            if (myUser.class == 'administrador') {
                main.appendChild(await requestAdm());
                const acceptUser = document.querySelectorAll('.acceptUser-button');
                const rejectUser = document.querySelectorAll('.rejectUser-button');
                for (const i in acceptUser) {
                    acceptUser[i].addEventListener('click', async () => {
                        const idUser = acceptUser[i].id.split('_')[1];
                        const resp = await acceptuser(idUser);
                        if (resp.status == 200) {
                            newAlert('Usuário Aceito');
                        }
                    });
                    rejectUser[i].addEventListener('click', async () => {
                        const idUser = rejectUser[i].id.split('_')[1];
                        const resp = await rejectuser(idUser);
                        if (resp.status == 200) {
                            newAlert('Usuário Rejeitado');
                        }
                    });
                }
            }

            break;
        case '#signup':
            main.appendChild(signup());
            const submit = document.querySelector('#signup-submit');
            submit.addEventListener('click', async () => {
                const resp = await postUser();
                if (resp.message == 'Usuário adicionado com sucesso') {
                    newAlert('Cadastro realizado com sucesso');
                    window.location.hash = '#login';
                } else {
                    newAlert(resp.ERROR);
                }
            });
            break;
        case '#addBook':
            main.appendChild(addBook());
            const save = document.querySelector('#save-new-book-button');
            save.addEventListener('click', async () => {
                const resp = await postBook();
                if (resp.message == 'Livro adicionado com sucesso') {
                    
                    refreshData();
                    newAlert('Livro adicionado com sucesso.');
                    window.location.hash = '#books';
                } else {
                    newAlert(resp.ERROR);
                }
            });
            break;
        case '#editBook':
            main.innerHTML = '';
            main.appendChild(await editBook(book));
            break;
        case '#acess':
            window.location.hash = '#books';
            break;
        case '#profile':
            refreshData();
            renderProfile();
            break;
        case '#logout':

            break;
        case '#book-requests':
            main.appendChild(await requestsBookAdm());
            const acceptBook = document.querySelectorAll('.acceptBook-button');
            const rejectBook = document.querySelectorAll('.rejectBook-button');
            for (const i in acceptBook) {
                acceptBook[i].addEventListener('click', async () => {
                    const idBook = acceptBook[i].id.split('_')[1];
                    const resp = await acceptbook(idBook);
                    if (resp.status == '200') {
                        newAlert('Livro aceito.');
                        window.location.hash = '#books';
                    }
                });
                rejectBook[i].addEventListener('click', async () => {
                    const idBook = rejectBook[i].id.split('_')[1];
                    const resp = await rejectbook(idBook);
                    if (resp.status == '200') {
                        newAlert('Livro rejeitado.');
                        window.location.hash = '#books';
                    }
                });
            }
            break;

    }
});

export { myUser, idUser, em, pass };

