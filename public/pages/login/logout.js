export default async () => {

    const resp = await fetch(`user/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {}
    });

    return resp.json();
};