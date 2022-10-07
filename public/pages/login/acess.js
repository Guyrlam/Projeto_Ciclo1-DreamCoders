export default async () => {
    console.log('oi')
    const email = document.querySelector('#email-login')
    const password = document.querySelector('#password-login')
    console.log(email.value,password.value)

    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);

    const resp = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'email': 'daniel.dr206@gmail.com',
            'password': '12345f'
        })
    });
    
    return resp.json()
}

