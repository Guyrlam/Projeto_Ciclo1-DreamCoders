async function search(value) {
    const list = [];
    const req = await fetch('//140.82.6.89:8080/book');
    const result = await req.json();
    for (let i = 0; i < result.data.length; i += 1) {
        const el = result.data[i];
        if (
            el.name.includes(value) ||
            el.description.includes(value) ||
            el.colector.includes(value) ||
            el.publisher.includes(value) ||
            el.writer.includes(value) ||
            el.condition.includes(value)
        ) {
            list.push(el);
        }
    }
    return list;
}
