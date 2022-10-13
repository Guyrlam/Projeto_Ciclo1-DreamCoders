/**
 * Cadastra um novo usuário na base de dados.
 *
 * @returns Retorna sucesso caso os dados do formulário sejam validados.
 * @type object
 */
export default async function postUser() {
    const formData = new FormData();
    const name = document.querySelector('#name-signup');
    const email = document.querySelector('#email-signup');
    const telephone = document.querySelector('#telephone-signup');
    const classe = 'cliente';
    const password = document.querySelector('#password-signup');
    const repassword = document.querySelector('#confirm-password');

    const image = document.querySelector('#profile-photo-signup');

    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('image', image.files[0]);
    formData.append('telephone', telephone.value);
    formData.append('password', password.value);
    formData.append('class', classe);

    const resp = await fetch(`:8080/user`, {
        method: 'POST',
        body: formData,
    });
    if (password.value != repassword.value) {
        const resp = {
            ERROR: 'As duas senhas precisam ser iguais!',
        };
        return resp;
    }

    return resp.json();
}
