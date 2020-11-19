import {NavBarInit} from "Js/components/header/navBar";
import createElem from "Js/libs/createElem";
import {selectCheckbox} from "./components/createCompany/createCompany.js";
import {INPUT_TEXT_OK, spheres} from "Js/libs/constants";
import createCompanyTemp from './components/createCompany/createCompany.tmpl.xml'
import Validation from "Js/libs/validation";


export const app = window.document.getElementById('app');


export default class CreateCompany {
    constructor(onsubmit) {
        this.onsubmit = onsubmit
    }

    render(content) {
        app.innerHTML = '';

        const createCompanyNavBar = new NavBarInit(app,  false, "Создание организации");
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

let error = document.getElementsByClassName('error');

function checkCreateOrg(submitF, form) {
    let cbArr = []
    const cb = document.getElementById("checkboxes");
    for (let i = 0; i < cb.childElementCount; i++) {
        if (cb.children[i].children[0].checked) {
            cbArr.push(parseInt(cb.children[i].children[0].id))
        }
    }

    let isOk = true;
    const organizationName = document.getElementById('organizationName');
    const description = document.getElementById('description');

    const resOrganizationName = Validation.validateTextField(organizationName.value);
    const resDescription = Validation.validateTextField(description.value);

    if (resOrganizationName !== INPUT_TEXT_OK) {
        isOk = false;
        error[0].innerHTML = `${resOrganizationName}`;
    }
    if (resDescription !== INPUT_TEXT_OK) {
        isOk = false;
        error[1].innerHTML = `${resDescription}`;
    }

    if (isOk) {
        submitF(form, cbArr);
    }

}