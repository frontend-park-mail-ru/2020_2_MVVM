import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createEmployerSum/createEmpoyerSum.js";
import createElem from "../../libs/createElem.js";

const app = window.document.getElementById('app');


export default class CreateVacancy{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }
    render(isAuthorized, content){
        app.innerHTML = '';

        console.log(content)
        const employersList = new NavBarInit(app, isAuthorized, false,"Создание вакансии");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createEmployerSum.tmpl']());

        afterRender();
        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => this.onsubmit(event, form));
    }
}

function afterRender() {
    checkFrom();
}