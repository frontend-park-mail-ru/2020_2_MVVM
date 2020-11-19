import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/reg_form/reg.js";
import createElem from "Js/libs/createElem";
import regTemp from './components/reg_form/reg.tmpl.xml'

const app = window.document.getElementById('app');


export default class RegList{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(content){
        app.innerHTML = '';


        const auth = new NavBarInit(app,  false,"Регистрация");
        auth.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("beforeend", regTemp());

        const form = document.querySelector("form");
        let error = document.getElementsByClassName('error');

        checkFrom(this.onsubmit, form, error);
    }
}
