export default async (book, booktoexchange) => {
    await console.log(book, booktoexchange)
    const resp = await fetch(`//140.82.6.89:8080/swap`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'change_for': book.id,
            'book_id': booktoexchange.id
        })
    });
    
    return await resp.json()
}
