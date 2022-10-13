export default async (id) => {
    const rawResponse = await fetch(`//140.82.6.89:8080/user/${id}`);
    const content = rawResponse.json();
    return content;
};
