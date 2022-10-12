export default async (id) => {
    const resp = await fetch((`//localhost:8080/swap/rejected/${id}`), {
        method: 'PUT',
        body: {}
    });
    return resp.json()
}