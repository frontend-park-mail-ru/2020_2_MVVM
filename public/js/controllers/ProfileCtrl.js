import Profile from "../pages/profile/profile.js";

export default class ProfileCtrl{
    constructor(router) {
        this.router = router;
        this.page = new Profile();
    }
}