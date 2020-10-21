import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/auth_form/auth.js";
import createElem from "../../libs/createElem.js";


const app = window.document.getElementById('app');


export default class AuthList {
    constructor(onsubmit) {
        this.onsubmit = onsubmit;
    }

    render(isAuthorized){

        app.innerHTML = '';

        const auth = new NavBarInit(app, isAuthorized,false, "Авторизация");
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        const mainAuth = createElem("div", "main", main);
        mainAuth.insertAdjacentHTML("beforeend", window.fest['auth.tmpl']());

        afterRender(this.onsubmit);
    }

}
function afterRender(submitF) {
    checkFrom(submitF);
}
