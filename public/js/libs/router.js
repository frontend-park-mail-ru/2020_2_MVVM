import {URL, UNAUTHORISED, meUserURL} from "./constants.js";
import {network} from "./networks.js";

export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentRoute = null;

        window.addEventListener('popstate', () => {
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
        const expr = path.split('/').map((elem) => {
            return elem;
        }).join('\\/');

        this.routes.set(RegExp(`^${expr}$`), {root: root, page: page});
    }

    /**
     * Делает смену page
     * @param {string} path
     * @param args
     */
    change(path, ...args) {

        const  get_person = async () => {
            const response = await network.doGet(`${meUserURL}`);
            if (response.status >= 200 && response.status < 300) {
                console.assert(response.ok);
                return await response.json();
            } else if (response.status === UNAUTHORISED) {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }

        if (this.currentRoute === path) {
            return;
        }

        for (const key of this.routes.keys()) {
            if (path.match(key)) {
                this.currentRoute = path;
                const obj = this.routes.get(key);

                get_person().then((content) => {
                    obj.page.render(true, content, ...args)
                }).catch(() => {
                    // console.log("kek");
                    obj.page.render(false, null, ...args)
                });

                window.history.pushState(null, null, path);
                return;
            }
        }




        // if (path === this.root) {
        //     // window.history.replaceState(null, path.slice(1), path);
        //     return;
        // }
        //
        // this.root = path;
        // const obj = this.routes.get(path);
        //
        // get_person().then((content) => {
        //     obj.page.render(true, content, ...args)
        // }).catch(() => {
        //     // console.log("kek");
        //     obj.page.render(false, null, ...args)
        // });

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

        // if (location.pathname === "/test/public/index.html") {
        //     this.change('\/mainPage', user);
        // } else {
            console.log(location.pathname);
            this.change(location.pathname , user);
        // }


    }
}