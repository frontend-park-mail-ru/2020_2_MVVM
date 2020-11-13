import {NavBarInit} from "Js/components/header/navBar";
import {checkFrom} from "./components/auth_form/auth.js";
import createElem from "Js/libs/createElem";
import authTemp from './components/auth_form/auth.tmpl.xml'


const app = window.document.getElementById('app');


export default class AuthList {
    constructor(onsubmit) {
        this.onsubmit = onsubmit;
    }

    render(content){

        app.innerHTML = '';

        const auth = new NavBarInit(app, content,false, "Авторизация");
        console.log(content);
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("beforeend", authTemp());

        const form = document.querySelector("form");
        let error = document.getElementsByClassName('error');

        afterRender(this.onsubmit, form, error);
    }

}
function afterRender(submitF, form, error) {
    checkFrom(submitF,form, error);
}
