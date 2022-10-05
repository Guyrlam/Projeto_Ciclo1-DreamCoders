export default () => {
    console.log('oi')
    const container = document.createElement('div')
    const template =  `
    <section>
        <h1>Login</h1>
    </section>
    `
    container.innerHTML = template
    return container
}