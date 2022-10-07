export default async () => {
    const email = document.querySelector('email-login')
    const password = document.querySelector('password-login')


    const resp = await fetch('http://localhost:8080/book', {
        method: 'POST',
        body: {
            "email": email,
            "password": password
        },
    });
    console.log(email,password)
    return resp.json()
}