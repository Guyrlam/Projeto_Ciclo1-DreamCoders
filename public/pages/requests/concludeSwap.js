export default async (id) => {
    const resp = await fetch(`:8080/swap/finish/conclude/${id}`, {
        method: 'PUT',
        body: {},
    });

    return resp.json();
};
