import { checkState } from "./main.js";
import { $ } from "./getElement.js";
import { showItem } from "./showItem.js";

//If you want to change the search query use a & instead of a ?
export function renderSearchItems(collection){
    checkState("search")

    if(collection.artObjects.length === 0){
        //If there are no objects, no results
        checkState("noSearchResults")
        return;
    }

    const list = $('.displaySearchResults ul');
    for (let i = 0; i < collection.artObjects.length; i++) 
    {
      list.insertAdjacentHTML(
          "beforebegin",
          `<button class="result-piece">
              <img src="${collection.artObjects[i].webImage.url.slice(0, -3) + "=s1000"}" alt="${collection.artObjects[i].title}"/>
              <h2>${collection.artObjects[i].title}</h2>
          </button>`)
    }
    //Set an on click event where the item pops
    document.querySelectorAll(".result-piece").forEach((artPiece, index)=>{
        artPiece.addEventListener("click", ()=>{
            const id = collection.artObjects[index].objectNumber;
            //Give the id, which is needed to fetch the correct data
            showItem(id, artPiece)
        })
    })
}