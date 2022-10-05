import feed from "./pages/books/index.js"
import home from "./pages/home/index.js"
import details from "./pages/details/index.js"
const main = document.querySelector('#root')


    window.addEventListener("hashchange", () => {
        main.innerHTML = ""
        switch(window.location.hash){
            case "#books":
                main.appendChild(feed())
            break;
            case "#home":
                main.appendChild(home())
            break;
            case "#details":
                main.appendChild(details())
            break;
            
        }
    })
    const switchModal = () => {
        const modal = document.querySelector('.modal')
        const actualStyle = modal.style.display
        if(actualStyle == 'block') {
          modal.style.display = 'none'
        }
        else {
          modal.style.display = 'block'
        }
      }
      
      const btn = document.querySelector('.modalBtn')
      btn.addEventListener('click', switchModal)
      
      window.onclick = function(event) {
          const modal = document.querySelector('.modal')
        if (event.target == modal) {
          switchModal()
        }
        
    
      }
      document.querySelector('.fechar').onclick = function(event) {
       
        switchModal()
    }






