import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkFrom} from "./components/createEmployerSum/createEmpoyerSum.js";

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class CreateVacancy{
    render(user){
        app.innerHTML = '';

        const employersList = new NavBarInit(app, Boolean(user.id), "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createEmployerSum.tmpl']());

        afterRender();
    }
}

function afterRender() {
    checkFrom();
}