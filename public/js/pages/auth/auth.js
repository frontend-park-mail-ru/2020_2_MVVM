import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkFrom} from "./components/auth_form/auth.js";


const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class AuthList {


    render(user){
        app.innerHTML = '';

        const auth = new NavBarInit(app, user, "Авторизация");
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        const mainAuth = createElem("div", "main", main);
        mainAuth.insertAdjacentHTML("beforeend", window.fest['auth.tmpl']());


        afterRender();
    }

}
function afterRender() {
    checkFrom();
}
