import bNavBartemplate from './bNavBar/bNavBar.tmpl.xml'
import sNavBartemplate from './sNavBar/sNavBar.tmpl.xml'

export class NavBarInit {
    constructor(app, user,isBig, title) {
        this.app = app;
        this.user = user;
        this.has_company = localStorage.getItem('has_company');
        this.isBig = isBig;
        this.title = title;
    }

    loadNavBar() {
        let has_company = this.has_company === 'true';
        const data = {title: this.title, user: this.user, has_company: has_company};
        const navBar = new NavBar(this.app, this.isBig, data);
        navBar.loadNavBar(data.user);
    }
}

export class NavBar {

    constructor(app, isBig, data) {
        if (isBig) {
            app.innerHTML = bNavBartemplate(data);
        } else {
            app.innerHTML = sNavBartemplate(data);
        }
    }

    loadNavBar(user) {
        let list = document.getElementsByClassName('menu-list')[0];
        if (user) {
            list.insertAdjacentHTML("beforeend",`<a href="/profile" class="header__item header__item_key-icon js-profile">Профиль</a>
            <a href="/logout" class="header__item header__item_link-icon js-logout">Выйти</a>`);
        } else {
            list.insertAdjacentHTML("beforeend", `<a href="/reg" class="header__item header__item_key-icon js-registration">Зарегистрироваться</a>
            <a href="/auth" class="header__item header__item_link-icon js-login">Войти</a>`);
        }
    }

}

