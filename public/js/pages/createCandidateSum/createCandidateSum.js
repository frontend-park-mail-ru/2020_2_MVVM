import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createCandidateSum/createCandidateSum.js";
import {renderInputForm} from "./components/popUpCand/createOneJob.js"


export const app = window.document.getElementById('app');
export let jobsArr=[];

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

    render(isAuthorized, content){
        app.innerHTML = '';


        const employersList = new NavBarInit(app, isAuthorized, false, "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);

        main.insertAdjacentHTML("afterbegin", window.fest['createCandidateSum.tmpl']());

        afterRender();
        popUp();

        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => this.onsubmit(event, form, jobsArr));
    }
}

function afterRender() {
    checkFrom();
}

async function popUp() {
    const btn = document.getElementById("btn__add_exp");
    await btn.addEventListener('click', (event) => {
        renderInputForm();
    });
}
