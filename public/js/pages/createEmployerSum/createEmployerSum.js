import {NavBarInit} from "Js/components/header/navBar";
// import createElem from "../../libs/createElem.js";
import createElem from "Js/libs/createElem";
import {spheres} from "Js/libs/constants";
import createEmployerSumTemp from "./components/createEmployerSum/createEmployerSum.tmpl.xml"



const app = window.document.getElementById('app');


export default class CreateVacancy {
    constructor(sendVacancy, loadCompany, router) {
        this.sendVacancy = sendVacancy;
        this.loadCompany = loadCompany
        this.router = router;
    }

    async render(content) {
        app.innerHTML = '';
        this.content = {
            user: content.user,
            company: null,
            comp_logo: null,
            spheres: spheres
        }
        await this.loadCompany().then((data) => {
            if (data && data.company) {
                this.content.company = data.company;
                this.content.comp_logo = `static/company/${data.company.id}`
            } else {
                this.content.comp_logo = "img/em1.jpg"
            }
        });
        console.log(this.content)
        const employersList = new NavBarInit(app, content, false, "Создание вакансии");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", createEmployerSumTemp(this.content));

        //afterRender();
        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => this.sendVacancy(event, form));
    }
}

function afterRender() {
    checkFrom();
}