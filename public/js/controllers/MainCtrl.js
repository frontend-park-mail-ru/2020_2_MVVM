import MainList from '../pages/mainPage/mainPage.js';

export default class MainCtrl{
    constructor(router) {
        this.router = router;
        this.page = new MainList();
    }
}