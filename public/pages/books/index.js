export default () => {
    console.log('books template');
    const container = document.createElement('div');

    const template = `
    <section id="books">
        
        <div class="book-feed">
                <a href="#details" class="a-book-feed">
                    <img src="" alt="" class="img-book-feed" >
                </a>
        </div>
        <div class="book-feed">
                <a href="#details" class="a-book-feed">
                    <img src="" alt="" class="img-book-feed" >
                </a>
        </div>
        
        
    </section>
    `;
    container.innerHTML = template;
    return container;
};
