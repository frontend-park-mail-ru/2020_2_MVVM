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

    const main = createElem("div", "main", app);
    const container = createElem("div", "container", main);
    const mainRow = createElem("div", "main__row", container);
    mainRow.style.display = "flex";
    const mainList = createElem("div", "main__list",mainRow);
    mainList.insertAdjacentHTML("beforeend", window.fest['reg.tmpl']());
    mainList.insertAdjacentHTML("beforeend", window.fest['pagination.tmpl']());
    main.insertAdjacentHTML("afterEnd", window.fest['footer.tmpl']());


    afterRender();
}

function afterRender() {
    checkBoxes();
}
