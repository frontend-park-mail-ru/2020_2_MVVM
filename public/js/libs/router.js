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

        if (this.currentRoute === path) {
            return;
        }

        for (const key of this.routes.keys()) {
            if (path.match(key)) {
                this.currentRoute = path;
                const obj = this.routes.get(key);

                const user_type = localStorage.getItem('user_type');

                obj.page.render(user_type, ...args)

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

        const user = get_person().then((content) => {
            localStorage.setItem('user_type', content.user.user_type);
        }).catch(()=>{
            localStorage.setItem('user_type', '');
            localStorage.setItem('id', '');
        })

        document.addEventListener('click', (evt) => {
            const linkElement = evt.target.closest('a');

            if (linkElement) {
                evt.preventDefault();
                this.change(linkElement.pathname, user);
            }
        });

        this.change(location.pathname, user);
    }
}