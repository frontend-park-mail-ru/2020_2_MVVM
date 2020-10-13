import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkFrom} from "./components/reg_form/reg.js";

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class RegList{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(isAuthorized, content){
        app.innerHTML = '';


        const auth = new NavBarInit(app, isAuthorized, "Регистрация");
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        const mainAuth = createElem("div", "main", main);
        mainAuth.insertAdjacentHTML("beforeend", window.fest['reg.tmpl']());

        afterRender(this.onsubmit);
    }
}

function afterRender(submitF) {
    checkFrom(submitF);
}
