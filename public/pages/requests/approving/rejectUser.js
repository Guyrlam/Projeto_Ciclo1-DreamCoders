export default async (id) => {
    const resp = await fetch(`/admin/users/rejected/${id}`, {
        method: 'PUT',
        body: {},
    });
    return resp;
};
