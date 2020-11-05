import {NavBarInit} from "../../components/header/navBar.js";
import {checkFrom} from "./components/createEmployerSum/createEmpoyerSum.js";
import createElem from "../../libs/createElem.js";
import {spheres} from "../../libs/constants.js";

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
            this.content.company = data.company;
            this.content.comp_logo = `static/company/${data.company.id}`
        });
        console.log(this.content)
        const employersList = new NavBarInit(app, content, false, "Создание вакансии");
        employersList.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", window.fest['createEmployerSum.tmpl'](this.content));

        //afterRender();
        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => this.sendVacancy(event, form));
    }
}

function afterRender() {
    checkFrom();
}