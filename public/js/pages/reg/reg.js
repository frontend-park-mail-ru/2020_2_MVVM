import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export function renderRegList(user){

    app.innerHTML = '';

    const reg = new NavBarInit(app, user, "Регистрация");
    reg.loadNavBar();

    // afterRender();
}

function afterRender() {
    checkBoxes();
}
