import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/auth_form/auth.js";
import createElem from "../../libs/createElem.js";
import authTemp from './components/auth_form/auth.tmpl.xml'


const app = window.document.getElementById('app');


export default class AuthList {
    constructor(onsubmit) {
        this.onsubmit = onsubmit;
    }

    render(content){

        app.innerHTML = '';

        const auth = new NavBarInit(app, content,false, "Авторизация");
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        const mainAuth = createElem("div", "main", main);
        mainAuth.insertAdjacentHTML("beforeend", authTemp());

        afterRender(this.onsubmit);
    }

}
function afterRender(submitF) {
    checkFrom(submitF);
}
