export default async (id) => {
    const resp = await fetch(`:8080/swap/rejected/${id}`, {
        method: 'PUT',
        body: {},
    });
    return resp.json();
};
