import { fetchData } from "./fetchData.js";
import { addSearchListeners } from "./search.js";

const api_url = "https://www.rijksmuseum.nl/api/nl/collection?key=ixmhN4my&ps=20&imgonly=true"
export const loadingText = document.getElementById("loadingText");
export const loadingElement = document.getElementById("loadElement");

const errorText = document.getElementById("errorText");
const noResultsText = document.getElementById("noResultsText");

export let currentState = "empty";

//Start with the state empty
onload = checkState(currentState);
//Add listener to the search, so I know when the user searches
addSearchListeners();

//If internet is offline, show error
window.addEventListener("offline", function() {
    checkState("error");
  });

//Check which state it is, then run the code specific for that state
export function checkState(currentState){
    switch(currentState){
        case "empty":
            fetchData(api_url, "paintings");
            break;
        case "loading":
            //Enable the loading animation + text
            loadingText.textContent = "Loading";
            loadingElement.style.display = "block";   
            
            errorText.textContent = "";
            break;
        case "paintings":      
            loadingElement.style.display = "none";
            errorText.textContent = "";
            loadingText.textContent = "";
            noResultsText.textContent = "";
            break;
        case "search":
            hideArtpieces();
            noResultsText.textContent = "";
            break;
        case "noSearchResults":
            hideArtpieces();
            noResultsText.textContent = "No results found. \n Try a name like Rembrandt";
            break;
        case "error":
            hideArtpieces();
            loadingElement.style.display = "none";
            errorText.textContent = "No Internet";
            break;
    }
}

export function changeState(newState){
    currentState = newState;
    checkState();
}

//Hide the pieces from the main page, so it would not be displayed anywhere else
function hideArtpieces(){
    document.querySelectorAll(".art-piece").forEach((artPiece, index)=>{
        artPiece.style.display = "none";
    })
}

//show the pieces from the main page, so it would not be displayed anywhere else
export function showArtpieces(){
    document.querySelectorAll(".art-piece").forEach((artPiece, index)=>{
        artPiece.style.display = "block";
    })
}

export function deleteSearchResults(){
    document.querySelectorAll(".result-piece").forEach((resultPiece, index)=>{
        resultPiece.remove();
    })
}

