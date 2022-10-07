 async function postUser() {

    const formData = new FormData();
    const nome = document.querySelector('#book-title');
    const details = document.querySelector('#book-details');
    const publisher = document.querySelector('#publisher');
    const writer = document.querySelector('#writer');
    const condition = () => {
        if(document.getElementById(condition1 === true)){
            return 'novo'
        }
        else{
            return 'usado'
        }
    };
    
    const category = document.querySelector('#cateogry');
    const synopsis = document.querySelector('#synopsis');
    const image = document.querySelector('#input-book-photo');
    

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