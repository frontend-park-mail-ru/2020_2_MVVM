import {UNAUTHORISED, meUserURL} from "./constants.js";
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

        const get_person = async () => {
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
                    obj.page.render(content, ...args)
                }).catch(() => {
                    obj.page.render(null, ...args)
                });

                window.history.pushState(null, null, path);

                return;
            }
        }
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
        //     this.change('\/', user);
            this.change(location.pathname , user);


    }
}
