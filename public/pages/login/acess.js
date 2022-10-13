export default async () => {
    let email = document.querySelector('#email-login')
    let password = document.querySelector('#password-login')
    //console.log(email.value,password.value)


    //const formData = new FormData();
    //formData.append('email', email.value);
    //formData.append('password', password.value);

    const resp = await fetch(`//140.82.6.89:8080/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'email': email.value,
            'password': password.value
        })

    });

    return resp.json();
};
