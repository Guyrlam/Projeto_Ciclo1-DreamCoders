export default async (id) => {
    const resp = await fetch(`/swap/approved/${id}`, {
        method: 'PUT',
        body: {},
    });

    return resp.json();
};
