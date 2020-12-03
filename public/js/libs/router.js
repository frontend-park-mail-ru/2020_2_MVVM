import { meUserURL, UNAUTHORISED } from "./constants.js";
import { network } from "./networks.js";
import {createPolling, initPolling} from "Js/libs/polling";
import {desktopNavBarInit, mobileNavBarInit, removeNotifPage} from "Js/components/header/phoneNavBar/pNavBar";
import { NavBarInit } from "Js/components/header/navBar";
import {PAGES_NEED_SEARCH} from "Js/libs/constants";
import {changeNavBarPos} from "Js/libs/chengeNavBarPos";


const NavBar = new NavBarInit();

export default class Router {
  constructor(root) {
    this.root = root;

    this.routes = new Map();

    this.currentRoute = null;

    window.addEventListener("popstate", () => {
      this.change(location.pathname);
    });
  }

  /**
   * Добавляет новый маршрут
   * @param {string} path
   * @param {AuthList} page
   * @param {HTMLElement} root
   */
  add(path, page, root = this.root) {
    const expr = path
      .split("/")
      .map((elem) => {
        return elem;
      })
      .join("\\/");

    this.routes.set(RegExp(`^${expr}$`), { root: root, page: page });
  }

  /**
   * Делает смену page
   * @param {string} path
   * @param args
   */
  change(path, ...args) {
    if (this.currentRoute === path) {
      return;
    }

    for (const key of this.routes.keys()) {
      if (path.match(key)) {
        this.currentRoute = path;
        const obj = this.routes.get(key);

        const user_type = localStorage.getItem("user_type");
        initPolling();
        removeNotifPage();

        NavBar.updateNavBar(PAGES_NEED_SEARCH.indexOf(path) !== -1);

        obj.page.render(user_type, ...args);
        changeNavBarPos(path);

        window.history.pushState(null, null, path);

        return;
      }
    }
  }

  start() {
    const get_person = async () => {
      const response = await network.doGet(meUserURL);
      if (response.status >= 200 && response.status < 300) {
        console.assert(response.ok);
        return await response.json();
      } else if (response.status === UNAUTHORISED) {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    };

    const user = get_person()
      .then((content) => {
        localStorage.setItem("user_type", content.user.user_type);
      })
      .catch(() => {localStorage.setItem("user_type", "");
      });

    createPolling();


    document.addEventListener("click", (evt) => {
      const linkElement = evt.target.closest("a");

      if (linkElement) {
        evt.preventDefault();
        this.change(linkElement.pathname, user);
      }
    });



    if (document.body.classList.contains("is-mobile")) {
      NavBar.loadPhoneNavBarSmall(PAGES_NEED_SEARCH.indexOf(location.pathname) !== -1);
      mobileNavBarInit(NavBar);
    } else {
      NavBar.loadNavBar(false);
      desktopNavBarInit();
    }
    this.change(location.pathname, user,);
  }
}