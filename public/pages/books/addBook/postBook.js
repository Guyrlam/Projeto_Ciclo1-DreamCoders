import { myUser } from '../../../index.js';

export default async function postUser() {
    console.log('post user');

    const formData = new FormData();
    const name = document.querySelector('#book-title');
    const details = document.querySelector('#book-detail');
    const publisher = document.querySelector('#publisher');
    const writer = document.querySelector('#writer');
    const condition = () => {
        const cboxs = document.querySelectorAll('.book-conditions');
        for (const i in cboxs) {
            if (cboxs[i].checked === true) {
                return cboxs[i].value;
            }
        }
    };

    const category = document.querySelector('#category');
    const synopsis = document.querySelector('#synopsis');
    const image = document.querySelector('#input-book-photo');
    const collector = myUser.name;
    const collector_id = myUser.id;

    /*    formData.append({
           'name': name.value, 'details': details.value
       });
    formData.append(['name', 'details'], [name.value, details.value]);
    */
    formData.append('name', name.value);
    formData.append('details', details.value);
    formData.append('publisher', publisher.value);
    formData.append('writer', writer.value);
    formData.append('condition', condition());
    formData.append('category', category.value);
    formData.append('synopsis', synopsis.value);
    formData.append('image', image.files[0]);
    formData.append('collector', myUser.name);
    formData.append('collector_id', myUser.id);

    const resp = await fetch(`/book`, {
        method: 'POST',
        body: formData,
    });

    return resp.json();
}
