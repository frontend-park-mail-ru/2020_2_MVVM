

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
     * @param user
     */
    change(path, user) {

        const get_person = async () => {
            const response = await fetch(
                "api/v1/users/me",
                {
                    method: "get",
                },
            )
            console.assert(response.ok);
            const content = await response.json();
            console.log(content);
            return !!content;
        }

        if (path === this.root){
            return;
        }
        this.root = path;
        const obj = this.routes.get(path);
        obj.page.render(get_person());
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
        this.change('\/mainPage', user);
    }
}