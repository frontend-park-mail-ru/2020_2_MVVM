export class NavBar {

    constructor(app, title) {
        app.innerHTML = window.fest['navBar.tmpl'](title);
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
