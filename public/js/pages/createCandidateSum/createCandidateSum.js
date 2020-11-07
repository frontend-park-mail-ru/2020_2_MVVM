import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createCandidateSum/createCandidateSum.js";
import createElem from "../../libs/createElem.js";
import {renderInputForm} from "../../components/popUpResume/popUpCand/createOneJob.js";
import createCandidateSumTemp from './components/createCandidateSum/createCandidateSum.tmpl.xml'


export const app = window.document.getElementById('app');

export default class CreateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(content, ...args){
        //console.log(content);
        app.innerHTML = '';
        this.jobsArr = [];
        this.numOfJob = 0;

        const employersList = new NavBarInit(app, content, false, "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", createCandidateSumTemp(content.user));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRenderResume(this.onsubmit, form, this.jobsArr);
        });

        popUp(this);

    }
}

export function afterRenderResume(submitF, form, jobsArray) {
    checkFrom(submitF, form, jobsArray);
}

async function popUp(classCand) {
    const btn = document.getElementById("btn__add_exp");
    await btn.addEventListener('click', (event) => {
        renderInputForm(undefined, classCand);
    });
}
