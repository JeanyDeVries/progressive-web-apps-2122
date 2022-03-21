import { fetchData } from "./fetchData.js";
import { dataMuseum } from "./fetchData.js";

export function showItem(id, object){
    var urlID = "https://www.rijksmuseum.nl/api/nl/collection/" + id + "?key=ixmhN4my&imgonly=true";
    
    fetchData(urlID, "item");
    //Set a time out to let the data be fetched first
    setTimeout(() => {      
        popUp();
    }, 700);    
    location.hash = "showArtPiece/" + id;
}

function popUp(){
    var artPiece = document.getElementById("artPiece");
    var span = document.getElementsByClassName("close")[0];

    artPiece.style.display = "block";

    //When the button or outside is clicked, the display will be hidden
    span.onclick = function() {
        artPiece.style.display = "none";
        removeContent();
    }
    window.onclick = function(event) 
    {
        if (event.target == artPiece) {
            artPiece.style.display = "none";
            removeContent();
        }
    }

    displayContent();
}

var artPieceContent = document.getElementById("content");
function displayContent(){
    //display content
    artPieceContent.insertAdjacentHTML(
        "beforeend",
        `<img src="${dataMuseum.artObject.webImage.url}" alt="${dataMuseum.artObject.title}"/>
        <h2>${dataMuseum.artObject.title}</h2>
        <h3>${dataMuseum.artObject.dating.presentingDate}</h3>
        <p>${dataMuseum.artObject.description}</p>`)
}

function removeContent(){
    //Remove the concent when you want to go back
    while (artPieceContent.firstChild) {
        artPieceContent.removeChild(artPieceContent.firstChild);
    }
}
