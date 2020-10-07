

export default class Router{
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

        this.routes.set(expr, {root:root, page:page});
    }

    /**
     * Делает смену page
     * @param {string} path
     * @param args
     */
    change(path, ...args) {
        if (path === this.root) {
            return;
        }
        console.log(path);
        this.root = path;
        const obj = this.routes.get(path);
        // TODO: кажется, render надо вызывать у контроллера, который потом вызовет его у вью
        // иначе некуда положить логику хождения на сервер (во вью это делать не стоит)
        obj.page.render(...args);
    }

    start(user) {
        document.addEventListener('click', (evt) => {
            const linkElement = evt.target.closest('a');

            if (linkElement) {
                evt.preventDefault();
                this.change(linkElement.pathname, user);
            }
        });

        // начальный рендер
        this.change('\/mainPage', user);
    }
}