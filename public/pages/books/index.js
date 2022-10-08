async function temp(){
    const rawResponse = await fetch('http://localhost:8080/book');
    const content = await rawResponse.json();
    return content;  
    //console.log(content);
}

function list(data){ 
    let ktem=`
    <section id="books">`;
    for (var i = 0; i < data.length; i++) {console.log(ktem);
        ktem+=`
 
            <div class="book-feed">
                    <a href="#details" class="a-book-feed">
                        <img src="${data[i].images[0]}" alt="" class="img-book-feed" >
                    </a>
            </div>
        `;
    }
    ktem+=`</section>`;
    return ktem;
}

export default () => {
    console.log('books template');
    const container = document.createElement('div');
    let template;

    temp().then(function(data){ console.log(template);
        container.innerHTML =list(data.data);
    })


    console.log(template);
    //container.innerHTML = template;
    return container;
};

