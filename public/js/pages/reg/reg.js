import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/reg_form/reg.js";
import createElem from "../../libs/createElem.js";

const app = window.document.getElementById('app');

export default class RegList{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(content){
        app.innerHTML = '';



        const auth = new NavBarInit(app, content, false,"Регистрация");
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        const mainAuth = createElem("div", "main", main);
        mainAuth.insertAdjacentHTML("beforeend", window.fest['reg.tmpl']());

        const form = document.querySelector("form");
        let error = document.getElementsByClassName('error');

        checkFrom(this.onsubmit, form, error);
    }
}
//
// function afterRender(submitF) {
//     checkFrom(submitF);
// }
