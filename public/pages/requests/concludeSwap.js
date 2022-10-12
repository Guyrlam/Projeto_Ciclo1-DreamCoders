export default async (id) => {
    const resp = await fetch((`//localhost:8080/swap/finish/conclude/${id}`), {
        method: 'PUT',
        body: {}
    });
    
    return resp.json()
}