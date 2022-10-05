export default () => {
    console.log('books template')
    const container = document.createElement('div')

    const template = `
    <section id="books">
        
        <div class="book-feed">
                <a href="#details">
                    <img src="" alt="" style="width: 100%; height:100%;">
                </a>
        </div>
        <div class="book-feed">
                <a href="#details">
                    <img src="" alt="" style="width: 100%; height:100%;">
                </a>
        </div>
        <div class="book-feed">
                <a href="#details">
                    <img src="" alt="" style="width: 100%; height:100%;">
                </a>
        </div>
        <div class="book-feed">
                <a href="#details">
                    <img src="" alt="" style="width: 100%; height:100%;">
                </a>
        </div>
        <div class="book-feed">
                <a href="#details">
                    <img src="" alt="" style="width: 100%; height:100%;">
                </a>
        </div>
        
        
    </section>
    `;
    container.innerHTML = template;
    return container;
};
