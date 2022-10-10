export default async (id) => {
    const rawResponse = await fetch(`//localhost:8080/user/${id}`);
    const content = rawResponse.json();
    return content;
}