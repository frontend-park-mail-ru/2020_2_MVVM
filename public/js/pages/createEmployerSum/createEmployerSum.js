import {NavBarInit} from "../../components/navBar/navBar.js";

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export function renderEmployerSummaryCreation(user) {
    app.innerHTML = '';

    const employersList = new NavBarInit(app, user, "Создание резюме");
    employersList.loadNavBar();

    const main = createElem("div", "main", app);
    main.insertAdjacentHTML("afterbegin", window.fest['createEmployerSum.tmpl']());
}