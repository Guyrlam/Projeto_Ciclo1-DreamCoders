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

const main = document.querySelector('#root');
let myUser = {};
let idUser = '';
const myBooks = [];
let book = {};

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
                        alert('Cadastre-se primeiro');
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
                            alert(resp.message);
                            window.location.hash = '#books';
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
            consolge.log('oi');
            book = books[i];
            main.innerHTML = '';
            main.appendChild(details(bookData.data[i]));
            const solicitar = document.querySelector('#button-solicitar');
            solicitar.addEventListener('click', () => {
                if (idUser == '') {
                    alert('Cadastre-se primeiro.');
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
                        alert(resp.message);
                        window.location.hash = '#books';
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
                            alert('Cadastre-se primeiro');
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
                                alert(resp.message);
                                window.location.hash = '#books';
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

                    hLogin.innerHTML = '';
                    hLogin.appendChild(await headerLogin());
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
                                            alert('Perfil editado com sucesso!');
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
                    alert(resp.ERROR);
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
                    'requestsCliente-reject'
                );
                for (const k in acceptSwap) {
                    acceptSwap[k].addEventListener('click', async () => {
                        const idSwap = acceptSwap[k].id.split('_')[1];
                        const resp = await approvedswap(idSwap);
                        await alert(resp.message);
                        const resp1 = concludeSwap(idSwap);
                        await console.log(resp1);
                        await refreshData();
                    });
                    rejectSwap[k].addEventListener('click', async () => {
                        const idSwap = rejectSwap[k].id.split('_')[1];
                        const resp = await rejectswap(idSwap);
                        await alert(resp.message);
                        const resp1 = concludeSwap(idSwap);
                        await console.log(resp1);
                        await refreshData;
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
                            alert('Usuário Aceito');
                        }
                    });
                    rejectUser[i].addEventListener('click', async () => {
                        const idUser = rejectUser[i].id.split('_')[1];
                        const resp = await rejectuser(idUser);
                        if (resp.status == 200) {
                            alert('Usuário Rejeitado');
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
                    alert('Cadastro realizado com sucesso');
                    window.location.hash = '#login';
                } else {
                    alert(resp.ERROR);
                }
            });
            break;
        case '#addBook':
            main.appendChild(addBook());
            const save = document.querySelector('#save-new-book-button');
            save.addEventListener('click', async () => {
                const resp = await postBook();
                if (resp.message == 'Livro adicionado com sucesso') {
                    alert('Livro adicionado com sucesso.');
                    refreshData();
                    window.location.hash = '#books';
                } else {
                    alert(resp.ERROR);
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
        case '#book-requests':
            main.appendChild(await requestsBookAdm());
            const acceptBook = document.querySelectorAll('.acceptBook-button');
            const rejectBook = document.querySelectorAll('.rejectBook-button');
            for (const i in acceptBook) {
                acceptBook[i].addEventListener('click', async () => {
                    const idBook = acceptBook[i].id.split('_')[1];
                    const resp = await acceptbook(idBook);
                    if (resp.status == '200') {
                        alert('Livro aceito.');
                        window.location.hash = '#books';
                    }
                });
                rejectBook[i].addEventListener('click', async () => {
                    const idBook = rejectBook[i].id.split('_')[1];
                    const resp = await rejectbook(idBook);
                    if (resp.status == '200') {
                        alert('Livro rejeitado.');
                        window.location.hash = '#books';
                    }
                });
            }
            break;
    }
});

export { myUser, idUser };

/* window.addEventListener('load', () => {
    main.appendChild(home())
} */
