export default async (value) => {
    const req = await fetch('/book');
    const result = await req.json();
    console.log(value);
    const list = [];
    for (let i = 0; i < result.data.length; i++) {
        const el = result.data[i];
        if (
            el.name.toLowerCase() == value.toLowerCase() ||
            el.publisher.toLowerCase() == value.toLowerCase()
        ) {
            list.push(el);
        }
    }
    return list;
};
