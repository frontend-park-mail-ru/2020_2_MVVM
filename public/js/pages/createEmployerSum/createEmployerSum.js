import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createEmployerSum/createEmpoyerSum.js";
import createElem from "../../libs/createElem.js";

const app = window.document.getElementById('app');


export default class CreateVacancy{
    render(isAuthorized, content){
        app.innerHTML = '';


        const employersList = new NavBarInit(app, isAuthorized, false,"Создание вакансию");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createEmployerSum.tmpl']());

        afterRender();
    }
}

function afterRender() {
    checkFrom();
}