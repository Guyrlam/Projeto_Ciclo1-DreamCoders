export default async (user) => {
    const name = document.querySelector('#edit-username');
    const description = document.querySelector('#edit-userdescription');
    const photo = document.querySelector('#new-photo');
    const email = document.querySelector('#edit-useremail');
    const tel = document.querySelector('#edit-usertel');

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('description', description.value);
    formData.append('telephone', tel.value);
    formData.append('image', photo.files[0]);
    formData.append('class', user.class);

    const resp = await fetch(`:8080/user/${user.id}`, {
        method: 'PUT',
        body: formData,
    });
    console.log(resp);
    return resp;
};
