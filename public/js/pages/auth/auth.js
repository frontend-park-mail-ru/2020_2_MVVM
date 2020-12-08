import { checkFrom } from "./components/auth_form/auth.js";
import createElem from "Js/libs/createElem";
import authTemp from "./components/auth_form/auth.tmpl.xml";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";

const app = window.document.getElementById("main");

export default class AuthList {
  constructor(onsubmit) {
    this.onsubmit = onsubmit;
  }

  render() {
    app.innerHTML = "";

    // openMenuList(app, false);

    const main = createElem("div", "main", app);
    main.insertAdjacentHTML("beforeend", authTemp());

    const form = document.querySelector("form");
    let error = document.getElementsByClassName("error");

    afterRender(this.onsubmit, form, error);
  }
}

function afterRender(submitF, form, error) {
  checkFrom(submitF, form, error);
}
