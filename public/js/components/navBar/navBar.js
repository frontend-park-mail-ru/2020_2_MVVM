
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
    }


    loadNavBar(user) {
        console.log(user);
        let list = document.getElementsByClassName('menu-list')[0];
        if (user) {
            list.insertAdjacentHTML("beforeend",`<a href="/profile" class="header__item header__item_key-icon js-profile">Профиль</a>
            <a href="#" class="header__item header__item_link-icon js-logout">Выйти</a>`);
        } else {
            list.insertAdjacentHTML("beforeend", `<a href="/reg" class="header__item header__item_key-icon js-registration">Зарегистрироваться</a>
            <a href="/auth" class="header__item header__item_link-icon js-login">Войти</a>`);
        }
    }

}

