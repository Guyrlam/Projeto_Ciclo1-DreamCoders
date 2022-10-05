import feed from './pages/books/index.js';
import details from './pages/details/index.js';
import home from './pages/home/index.js';
import login from './pages/login/index.js';
import profile from './pages/profile/index.js';
import signup from './pages/signup/index.js';

const main = document.querySelector('#root');

//   window.addEventListener("load", () => {
//       main.appendChild(home())
//   })

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
            break;
        case '#profile':
            main.appendChild(profile());
            break;
        case '#signup':
            main.appendChild(signup());
            const submit = document.querySelector('#signup-submit');
            submit.addEventListener('click', async () => {
                const resp = await postUser();
                
            });

            break;
    }
});

async function postUser() {
    const formData = new FormData();
    const nome = document.querySelector('#name-signup');
    const email = document.querySelector('#email-signup');
    const telephone = document.querySelector('#telephone-signup');
    const classe = 'cliente';
    const password = document.querySelector('#password-signup');

    const image = document.querySelector('#profile-photo');

    formData.append('name', nome.value);
    formData.append('email', email.value);
    formData.append('image', image.files[0]);
    formData.append('telephone', telephone.value);
    formData.append('password', password.value);
    formData.append('class', classe);

    const resp = await fetch('http://localhost:8080/user', {
        method: 'POST',
        body: formData,
    });

    return resp.json();
}
