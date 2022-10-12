export default async (id) => {
    const resp = await fetch((`//localhost:8080/swap/approved/${id}`), {
        method: 'PUT',
        body: {}
    });
    return resp.json()
}