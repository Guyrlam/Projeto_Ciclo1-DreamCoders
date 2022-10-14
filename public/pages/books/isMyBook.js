import { idUser } from '../../index.js';

export default (myuser, book) => {
    console.log(myuser);
    if (idUser == '') {
        return `
        <button id="button-solicitar">
            Solicitar
        </button>
        `;
    }
    for (const i in myuser.books) {
        if (myuser.books[i].collector_id == book.collector_id) {
            return true;
        }
        else{
            return false;
        }
        
    }
};
