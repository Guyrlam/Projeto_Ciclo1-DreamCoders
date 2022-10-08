
export default async function postUser() {
    console.log('oi')
    const formData = new FormData();
    const nome = document.querySelector('#book-title');
    const details = document.querySelector('#book-details');
    const publisher = document.querySelector('#publisher');
    const writer = document.querySelector('#writer');
    let condition = () => {
        const cboxs = document.querySelectorAll('.book-conditions')
        for (let i in cboxs) {
            if (cboxs[i].checked === true) {
                return cboxs[i].value
            }
        }
        
    }


    const category = document.querySelector('#cateogry');
    const synopsis = document.querySelector('#synopsis');
    const image = document.querySelector('#input-book-photo');

    formData.append('name', nome.value);
    formData.append('details', details.value);
    formData.append('publisher', publisher.value);
    formData.append('writer', writer.value);
    formData.append('condition', condition());
    formData.append('category', category.value);
    formData.append('synopsis', synopsis.value);
    formData.append('image', image.files[0]);

    const resp = await fetch('http://localhost:8080/book', {
        method: 'POST',
        body: formData,
    });

    return resp.json();
}
