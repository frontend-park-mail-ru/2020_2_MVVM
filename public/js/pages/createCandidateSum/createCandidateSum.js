import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createCandidateSum/createCandidateSum.js";
import createElem from "../../libs/createElem.js";
import {renderInputForm} from "../../components/popUpResume/popUpCand/createOneJob.js";


export const app = window.document.getElementById('app');
export let jobsArr=[];


export default class CreateResume{
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(isAuthorized, content, ...args){
        // console.log(args[2]);
        app.innerHTML = '';

        const employersList = new NavBarInit(app, isAuthorized, false, "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createCandidateSum.tmpl'](content.user));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRender(this.onsubmit, form, jobsArr);
        });

        popUp();

    }
}

function afterRender(submitF, form, jobsArr) {
    checkFrom(submitF, form, jobsArr);
}

async function popUp() {
    const btn = document.getElementById("btn__add_exp");
    await btn.addEventListener('click', (event) => {
        renderInputForm(undefined);
    });
}
