import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";
import {selectCheckbox} from "./components/createCompany/createCompany.js";
import {spheres} from "../../libs/constants.js";
import createCompanyTemp from './components/createCompany/createCompany.tmpl.xml'


export const app = window.document.getElementById('app');


export default class CreateCompany {
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(content) {
        app.innerHTML = '';

        const createCompanyNavBar = new NavBarInit(app, content, false, "Создание организации");
        createCompanyNavBar.loadNavBar();

        const main = createElem("div", "main", app);
        main.insertAdjacentHTML("afterbegin", createCompanyTemp(spheres));

        const form = main.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            checkCreateOrg(this.onsubmit, form);
        });

        afterRender();
    }
}

function afterRender() {
    selectCheckbox();
}

function checkCreateOrg(submitF, form) {
    let cbArr = []
    const cb = document.getElementById("checkboxes");
    for (let i = 0; i < cb.childElementCount; i++) {
        if (cb.children[i].children[0].checked) {
            cbArr.push(parseInt(cb.children[i].children[0].id))
        }
    }
    submitF(form, cbArr);
}