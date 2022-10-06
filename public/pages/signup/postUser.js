export default async function postUser() {

    const formData = new FormData();
    const nome = document.querySelector('#name-signup');
    const email = document.querySelector('#email-signup');
    const telephone = document.querySelector('#telephone-signup');
    const classe = 'cliente';
    const password = document.querySelector('#password-signup');

    const image = document.querySelector('#profile-photo-signup');

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