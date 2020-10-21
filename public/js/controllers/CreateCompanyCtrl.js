import CreateCompany from "../pages/createCompany/createCompany.js";

export default class CreateCompanyCtrl {
    constructor(router) {
        this.router = router;
        this.page = new CreateCompany();
    }
}