import RegList from '../pages/reg/reg.js';

export default class AuthCtrl{
    constructor(router) {
        this.router = router;
        this.page = new RegList();
    }
}