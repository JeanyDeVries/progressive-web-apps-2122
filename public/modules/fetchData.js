import { renderHTML } from "./renderHTML.js";
import { CheckError } from "./errorStates.js";
import { checkState } from "./main.js";
import { renderSearchItems } from "./renderSearchItems.js";

export let dataMuseum = null;

/*
export function fetchData(url, state){
    //Data is not there yet, so loading
    checkState("loading");

    //Fetch the data with the correct url
    fetch(url)
        .then(response => {
            if(response.ok)
                return response.json();
            else
                CheckError(response)
        })
        .then(function(collection){
            //Check which state, then render the correct html for it
            checkState("paintings");
            switch (state){
                case "paintings":
                    renderHTML(collection);
                    location.hash = "paintings";
                    break;
                case "item":
                    //Set the data correctly for later use in code
                    dataMuseum = collection;
                    break;
                case "search":
                    renderSearchItems(collection);
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
*/