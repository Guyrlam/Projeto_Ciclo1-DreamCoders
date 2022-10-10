export default async (id) => {
    const resp = await fetch((`//localhost:8080/admin/books/rejected/${id}`), {
        method: 'PUT',
        body: {}
    });
    return resp
}