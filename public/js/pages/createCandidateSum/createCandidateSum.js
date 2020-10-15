import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createCandidateSum/createCandidateSum.js";
import {network} from "../../libs/networks";
import {loginURL} from "../../libs/constants";

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

    render(isAuthorized, content){
        app.innerHTML = '';


        const employersList = new NavBarInit(app, isAuthorized, false, "Создание резюме");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createCandidateSum.tmpl']());

        afterRender();

        const btn = document.getElementById("btn__add_exp");
        console.log(btn);
        btn.addEventListener('click', (event) => {
            renderInputForm().then();
        });

        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => this.onsubmit(event, form));
    }
}

function afterRender() {
    checkFrom();
}


async function renderInputForm() {
    app.insertAdjacentHTML("afterbegin", window.fest['popUpCand.tmpl']());
    let exit = document.getElementsByClassName("popUp__cont_block");
    let bg = await document.getElementsByClassName("bg");
    exit = await Array.prototype.slice.call(exit);
    exit.forEach((item) => {
        item.addEventListener('click', (event) => {
            bg[0].remove();
        });
    });

    const data = await collectInfo();
}

async function collectInfo(){
    const form = document.getElementById("popUp__cand_form");
    let bg = await document.getElementsByClassName("bg");
    const data = {};
    form[0].addEventListener('submit', (event)=>{
        let formData = new FormData();
        data.start_work_year = formData.get("start_work_year");
        data.end_work_year = formData.get("end_work_year");
        data.type_of_job = formData.get("type_of_job");
        data.job = formData.get("job");
        data.duties = formData.get("duties");
    }).then(()=> {
        bg[0].remove();
        return data
    });

}