export default async (id) => {
    const resp = await fetch(`//140.82.6.89:8080/admin/books/rejected/${id}`, {
        method: 'PUT',
        body: {},
    });
    return resp;
};
