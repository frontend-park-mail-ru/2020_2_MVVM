import {NavBarInit} from "Js/components/header/navBar";
import createElem from "Js/libs/createElem";
import {DOMAIN, spheres} from "Js/libs/constants";
import createEmployerSumTemp from "./components/createEmployerSum/createEmployerSum.tmpl.xml";
import {checkFrom} from "Js/pages/createEmployerSum/components/createEmployerSum/createEmpoyerSum"
import {afterRenderResume} from "Js/pages/createCandidateSum/createCandidateSum";
import openMenuList from "Js/components/header/phoneNavBar/pNavBar";



const app = window.document.getElementById('app');


export default class CreateVacancy {
    constructor(sendVacancy, loadCompany, loadUserInfo, router) {
        this.sendVacancy = sendVacancy;
        this.loadCompany = loadCompany
        this.userInfo = loadUserInfo;
        this.router = router;
    }

    async render(content) {
        app.innerHTML = '';
        this.content = {
            user: (await this.userInfo()).user,
            company: null,
            comp_logo: null,
            spheres: spheres,
        }
        await this.loadCompany().then((data) => {
            if (data && data.company) {
                this.content.company = data.company;
                this.content.comp_logo = `${DOMAIN}static/company/${data.company.id}`
            } else {
                this.content.comp_logo = "img/em1.jpg"
            }
        });

        openMenuList(app, false);

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", createEmployerSumTemp(this.content));


        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            afterRenderVacancy(this.sendVacancy, form);
        });

    }
}

function afterRenderVacancy(submitF, form) {
    checkFrom(submitF, form);
}