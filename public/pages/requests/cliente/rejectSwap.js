export default async (id) => {
    const resp = await fetch((`/swap/rejected/${id}`), {
        method: 'PUT',
        body: {}
    });
    return resp.json()
}