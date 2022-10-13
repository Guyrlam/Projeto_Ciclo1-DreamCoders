export default async (id) => {
    const resp = await fetch(`:8080/admin/books/rejected/${id}`, {
        method: 'PUT',
        body: {},
    });
    return resp;
};
