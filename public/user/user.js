export default async (id) => {
    const rawResponse = await fetch(`/user/${id}`);
    const content = rawResponse.json();
    return content;
};
