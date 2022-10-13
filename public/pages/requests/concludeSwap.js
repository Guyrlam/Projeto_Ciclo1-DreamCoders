export default async (id) => {
    const resp = await fetch(`/swap/finish/conclude/${id}`, {
        method: 'PUT',
        body: {},
    });

    return resp.json();
};
