
import AuthList from '../pages/auth/auth.js';

export default class AuthCtrl{
    constructor(router) {
        this.router = router;
        this.page = new AuthList();
    }
}