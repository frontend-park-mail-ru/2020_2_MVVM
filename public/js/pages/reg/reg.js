import { checkFrom } from "./components/reg_form/reg.js";
import createElem from "Js/libs/createElem";
import regTemp from "./components/reg_form/reg.tmpl.xml";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

const app = window.document.getElementById("main");

export default class RegList {
  constructor(onsubmit) {
    this.onsubmit = onsubmit;
  }

  render(content) {
    app.innerHTML = "";

    // openMenuList(app, false);

    const main = createElem("div", "main", app);
    main.insertAdjacentHTML("beforeend", regTemp());

    const form = document.querySelector("form");
    let error = document.getElementsByClassName("error");

    checkFrom(this.onsubmit, form, error);
  }
}
