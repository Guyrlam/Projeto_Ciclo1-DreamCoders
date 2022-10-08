export default () => {
    console.log('requests template');
    const container = document.createElement('div');

    const template = `


    `;
    container.innerHTML = template;
    return container;
};