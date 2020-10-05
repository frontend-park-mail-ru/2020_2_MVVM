import {NavBarInit} from "../../components/navBar/navBar.js";
import {checkBoxes} from '../../components/searchForm/searchForm.js'

const app = window.document.getElementById('app');

function createElem(tag, className, parent) {
    const temp = document.createElement(tag);
    temp.className = className;
    parent.appendChild(temp);
    return temp
}

export function renderAuthList(user){

    app.innerHTML = '';

    const auth = new NavBarInit(app, user, "Войти");
    auth.loadNavBar();

    const main = createElem("div", "main", app);
    const container = createElem("div", "container", main);
    // mainRow.style.display = "flex";
    const mainAuth = createElem("div", "main", main);
    mainAuth.insertAdjacentHTML("beforeend", window.fest['auth.tmpl']());


    afterRender();
}

function afterRender() {
    checkBoxes();
}
