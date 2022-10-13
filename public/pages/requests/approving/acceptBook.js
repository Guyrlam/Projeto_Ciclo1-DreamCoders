export default async (id) => {
    const resp = await fetch(`/admin/books/approved/${id}`, {
        method: 'PUT',
        body: {},
    });
    return resp;
};
