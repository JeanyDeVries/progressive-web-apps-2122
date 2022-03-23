import { loadingText} from "./main.js"
import { $ } from "./getElement.js";
import { showItem } from "./showItem.js";
import { changeState } from "./main.js";

export function renderHTML(collection){
    const list = $('.displayItems ul');
    for (let i = 0; i < collection.artObjects.length; i++) 
    {
      list.insertAdjacentHTML(
          "beforebegin",
          `<button class="art-piece">
              <img src="${collection.artObjects[i].webImage.url.slice(0, -3) + "=s1000"}" alt="${collection.artObjects[i].title}"/>
              <h2>${collection.artObjects[i].title}</h2>
          </button>`)
    }
    //Set an on click event where the item pops
    document.querySelectorAll(".art-piece").forEach((artPiece, index)=>{
        artPiece.addEventListener("click", ()=>{
            const id = collection.artObjects[index].objectNumber
            location.hash = "showArtPiece";
            //Give the id, which is needed to fetch the correct data
            showItem(id, artPiece)
        })
    })

    loadingText.textContent = "";
    changeState("#paintings")
    
}