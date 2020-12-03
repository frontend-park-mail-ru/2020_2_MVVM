import {PAGES_WITH_ABSOLUTE} from "Js/libs/constants";


export function changeNavBarPos (path){
  const header = document.getElementsByClassName("header")[0];
  if (header) {
    if (PAGES_WITH_ABSOLUTE.indexOf(path) !== -1) {
      header.classList.add("header_absolute");
    } else if (header.classList.contains("header_absolute")) {
      header.classList.remove("header_absolute");
    }
  }
}