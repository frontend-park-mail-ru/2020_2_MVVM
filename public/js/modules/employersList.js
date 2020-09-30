import {NavBar} from "../components/navBar/navBar.js";

export default class employersListModule {
    constructor(app, user, title) {
        this.app = app;
        this.user = user;
        this.title = title;
        // navBar.loadNavBar(user);
    }

    loadNavBar() {
        const navBar = new NavBar(this.app, this.title);
        navBar.loadNavBar(this.user);
    }
}