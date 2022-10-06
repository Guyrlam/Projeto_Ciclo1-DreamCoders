import feed from "./pages/books/index.js"
import details from "./pages/details/index.js"
import editbook from "./pages/editbook/index.js"
import home from "./pages/home/index.js"
import login from "./pages/login/index.js"
import profile from "./pages/profile/index.js"
import signup from "./pages/signup/index.js"
const main = document.querySelector('#root')

//  window.addEventListener("load", () => {
//      main.appendChild(home())
//  })

window.addEventListener("hashchange", () => {
    main.innerHTML = ""
    switch (window.location.hash) {
        case "#books":
            main.appendChild(feed())
            break;
        case "#home":
            main.appendChild(home())
            break;
        case "#details":
            main.appendChild(details())
            break;
        case "#login":
            main.appendChild(login())
            break;
        case "#profile":
            main.appendChild(profile())
            break;
        case "#signup":
            main.appendChild(signup())
            break;
        case "#editbook":
            main.appendChild(editbook())
            break;
    }
})






