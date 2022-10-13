export default async (id) => {
    const resp = await fetch((`/admin/users/approved/${id}`), {
        method: 'PUT',
        body: {}
    });
    return resp
}