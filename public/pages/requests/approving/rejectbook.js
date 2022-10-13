export default async (id) => {
    const resp = await fetch(`/admin/books/rejected/${id}`, {
        method: 'PUT',
        body: {},
    });
    return resp;
};
