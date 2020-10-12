import {URL, UNAUTHORISED} from "./constants.js";

export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentRoute = null;
    }

    /**
     * Добавляет новый маршрут
     * @param {string} path
     * @param {Page} page
     * @param {HTMLElement} root
     */
    add(path, page, root = this.root) {
        const expr = path.split('/').map((elem) => {
            return elem;
        }).join('\/');

        this.routes.set(expr, {root: root, page: page});
    }

    /**
     * Делает смену page
     * @param {string} path
     * @param args
     */
    change(path, ...args) {

        const get_person = async () => {
            const response = await fetch(
                `${URL}/v1/users/me`,
                {
                    credentials: "include",
                    mode: "cors",
                    method: "get",
                },
            )
            // console.assert(response.ok);
            const content = await response.json();
            console.log(content.code);
            return content.code !== UNAUTHORISED;
        }

        if (path === this.root) {
            return;
        }
        this.root = path;
        const obj = this.routes.get(path);

        get_person().then((isauthorized) => {
            obj.page.render(isauthorized, ...args)
        });

        // TODO: кажется, render надо вызывать у контроллера, который потом вызовет его у вью
        // иначе некуда положить логику хождения на сервер (во вью это делать не стоит)
        // obj.page.render(...args);
        // obj.page.render(get_person());
    }

    start() {
        let user = false;
        document.addEventListener('click', (evt) => {
            const linkElement = evt.target.closest('a');

            if (linkElement) {
                evt.preventDefault();
                this.change(linkElement.pathname, user);
            }
        });

        // начальный рендер
        // this.change('\/createResume', user);
        this.change('\/mainPage', user);
    }
}