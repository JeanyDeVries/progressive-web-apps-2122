import { changeState } from "./main.js";

export function CheckError(response) {
    if (response.status >= 400 && response <= 499) {
        console.log("client error");
        changeState("error");
      } 
    else if (response.status >= 500 && response.status <= 599) {
        console.log("server error");
        changeState("error");
    } 
    else {
      throw Error(response.statusText);
    }
  }