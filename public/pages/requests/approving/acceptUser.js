export default async (id) => {
    const resp = await fetch((`//localhost:8080/admin/users/approved/${id}`), {
        method: 'PUT',
        body: {}
    });
    return resp
}