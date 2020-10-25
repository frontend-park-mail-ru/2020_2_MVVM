
export class NavBarInit {
    constructor(app, user,isBig, title) {
        this.app = app;
        this.user = user;
        this.isBig = isBig;
        this.title = title;
    }

    loadNavBar() {
        const navBar = new NavBar(this.app, this.isBig, this.title);
        navBar.loadNavBar(this.user);
    }
}

export class NavBar {

    constructor(app, isBig, title) {
        if (isBig) {
            app.innerHTML = window.fest['bNavBar.tmpl'](title);
        } else {
            app.innerHTML = window.fest['sNavBar.tmpl']();
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

