import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkFrom} from "./components/createCandidateSum/createCandidateSum.js";

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export default class CreateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(user){
        app.innerHTML = '';

        const employersList = new NavBarInit(app, user, "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createCandidateSum.tmpl']());

        afterRender();
        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => this.onsubmit(event, form));
    }
}

function afterRender() {
    checkFrom();
}