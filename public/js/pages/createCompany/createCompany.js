import {NavBarInit} from "../../components/header/navBar.js";
import createElem from "../../libs/createElem.js";


export const app = window.document.getElementById('app');


export default class CreateCompany{
    // constructor(onsubmit) {
    //     this.onsubmit = onsubmit
    // }

    render(isAuthorized, content){
        app.innerHTML = '';

        const createCompanyNavBar = new NavBarInit(app, isAuthorized, true, "Создание организации");
        createCompanyNavBar.loadNavBar();

    }
}
