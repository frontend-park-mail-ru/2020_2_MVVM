import {renderCandList} from "../../pages/candidatesList/candidatesList.js";
import {renderEmployersList} from "../../pages/employersList/employersList.js";

export class NavBarInit {
    constructor(app, user, title) {
        this.app = app;
        this.user = user;
        this.title = title;
    }

    loadNavBar() {

        const navBar = new NavBar(this.app, this.title);
        navBar.loadNavBar(this.user);
    }
}

export class NavBar {

    constructor(app, title) {
        app.innerHTML = window.fest['navBar.tmpl'](title);
        addPaths();
    }


    loadNavBar(user) {
        let list = document.getElementsByClassName('menu-list')[0];
        if (user) {
            list.insertAdjacentHTML("beforeend",`<a href="/profile" class="header__item header__item_key-icon js-profile">Профиль</a>
            <a href="/logout" class="header__item header__item_link-icon js-logout">Выйти</a>`);
        } else {
            list.insertAdjacentHTML("beforeend", `<a href="registration" class="header__item header__item_key-icon js-registration">Зарегистрироваться</a>
            <a href="login" class="header__item header__item_link-icon js-login">Войти</a>`);
        }
    }

}


function addPaths() {
    const navBar = document.getElementsByClassName('header__item');
    for (let i=0; i < navBar.length; i++) {
        navBar[i].addEventListener('click', (app, user) => {
            switch (navBar[i].textContent){
                case 'Главная страница':
                    break;
                case 'Работодатели':
                    renderEmployersList(user);
                    break;
                case  'Соискатели':
                    renderCandList(user)
            }
        });
    }
}
