import { em, pass } from "../../index.js";

export default async () => {
    // console.log(email.value,password.value)

    // const formData = new FormData();
    // formData.append('email', email.value);
    // formData.append('password', password.value);

    const resp = await fetch(`/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            email: em,
            password: pass,
        }),
    });

    return resp.json();
};