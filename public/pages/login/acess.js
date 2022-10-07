export default async () => {
    const email = document.querySelector('#email-login')
    const password = document.querySelector('#password-login')

    const formData = new FormData();
    await console.log(email.value,password.value)
    formData.append('email', email.value);
    formData.append('password', password.value);
    
    const resp = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        body: formData,
    });
    
    return resp.json()
}