export default async () => {
    const rawResponse = await fetch('http://localhost:8080/user');
    const content = rawResponse.json();
    return content;
}